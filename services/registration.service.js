const {registration} = require('../models');
const {users} = require('../models');
const midtransClient = require('midtrans-client');
const {competitions} = require('../models');

require('dotenv').config()

let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : process.env.SERVER_KEY,
    clientKey : process.env.CLIENT_KEY
});


exports.createRegistration = async (req,res) =>{
    const {competitionID,bank} = req.body
    const competition = await competitions.findOne({
        where : {
            id : competitionID
        }
    })

    if (!competition) {
        return {
            status : 404,
            message : "Competition not found"
        }
    }

    const userID = req.user_data.id
    const user = await users.findOne({
        where : {
            id : userID
        }
    })

    const dataMidtrans = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "order_id": `order-${competitionID}-${userID}-${Date.now()}`,
            "gross_amount" : competition.registration_fee
        },
        "items_details":[
            {
                "id": competitionID,
                "price": competition.registration_fee,
                "quantity": 1,
                "name": competition.name
            }
        ],
        "bank_transfer":{
            "bank": `${bank}`
        },
        "customer_details": {
            "first_name": user.firstName,
            "last_name": user.lastName,
            "number": user.phoneNumber
        }
    }

    let transactionToken = await coreApi.charge(dataMidtrans)
    console.log(transactionToken)
    const data = await registration.create({
        competitionID,
        userID,
        status : "pending",
        vaNumber : transactionToken.va_numbers[0].va_number,
        order_id : dataMidtrans.transaction_details.order_id,

    })


    return {
        status : 200,
        data : data,
        message : "Success add registration"
    }
}


exports.notification = async (req,res) =>{
    try {
        let midtransNotification = await coreApi.transaction.notification(req.body)
        
        let updated = await registration.update({
            status : midtransNotification.transaction_status
        },{
            where : {
                order_id : midtransNotification.order_id
            }
        })

        return {
            status : 200,
            message : "Success update status",
            data : updated
        }
    } catch (error) {
        console.log(error)
    }
}