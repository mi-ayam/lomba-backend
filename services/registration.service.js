const {registration} = require('../models');
const {users} = require('../models');
exports.createRegistration = async (req,res) =>{
    const {competitionID} = req.body
    
    const userID = req.user_data.id

    const data = await registration.create({
        competitionID,
        userID,
    })

    return {
        status : 200,
        data : data,
        message : "Success add registration"
    }
}