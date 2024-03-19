const {competitions} = require("../models")
const path = require("path");
const fs = require("fs");

const {imageValidation} = require("../validations/image.validation") 
const {rupiahFormat} = require("../helpers/rupiahformat")

exports.getAllCompetitions = async(req,res) =>{
    const data = await competitions.findAll()
    
    //convert registration_fee and prize to rupiah format
    const dataConverted = data.map((item) => {
        item.prize = rupiahFormat(item.prize)
        item.registration_fee = rupiahFormat(item.registration_fee)
        return item
    })

    return {
        status : 200,
        data : dataConverted,
        messages : "Success get all data"
    }
}

exports.getCompetitionByID = async (req,res) =>{

    const data = await competitions.findOne({
        where :{
            id : req.params.id
        }
    })

    data.dataValues.prize = rupiahFormat(data.dataValues.prize)
    data.dataValues.registration_fee = rupiahFormat(data.dataValues.registration_fee)

    if(data.length != 0){
        return {
            status : 200,
            data : data,
            message : "Success get data with id"
        }
    }else{
        return{
            status:404,
            message:"Data doesnt exists"
        }
    }
    
}

exports.addCompetition = async (req,res) =>{

    const {title,category,description,registration_fee,prize,registration_deadline} = req.body
    

    const image = req.files.image
    const imageExtension = image.name.split('.').pop()
    const fileTitle = title.split(' ').join('-')
    const filename = `/images/${fileTitle}.${imageExtension}`

    image.mv(path.join(path.dirname(__dirname),'public',filename))
    const data  = await competitions.create({
        title,
        category,
        description,
        registration_fee : Number(registration_fee),
        prize : Number(prize), 
        registration_deadline,
        image : filename
    })
    return {
        status : 200,
        data : data,
        message : "Success add competition"
    }
}

exports.editCompetition = async(req,res) => {

    let data = await competitions.findAll({
        where:{
            id : req.params.id
        }
    })

    if (data.length == 0) {
        return res.status(404).json({
          messages: "Data not found",
        });
    }

    const {title,category,description,registration_fee,prize,registration_deadline} = req.body
    
    const image = req.files.image
    const fileTitle = title.split(' ').join('-')
    const imageExtension = image.name.split('.').pop()
    const filename = `/images/${fileTitle}.${imageExtension}`

    if(image){
        const filenameold = data[0].image
        fs.unlinkSync(path.join(path.dirname(__dirname),'public',filenameold))
        image.mv(path.join(path.dirname(__dirname),'public',filename))
    }

    await competitions.update(
        {
            title : title,
            category : category,
            description : description,
            registration_fee : registration_fee,
            prize : prize,
            registration_deadline : registration_deadline,
            image : filename
        },
        {
            where : {
                id : req.params.id
            }
        }
    )
    
    return {
        status : 200,
        message : `Data with id ${req.params.id} edited sucessfuly`
    }
}

exports.deleteCompetition=  async (req,res) =>{
    
    let data = await competitions.findAll({
        where:{
            id : req.params.id
        }
    })

    if(data.length == 0 ){
        return {
            status : 404,
            message : "Data not found"
        }
    }
    
    fs.unlinkSync(path.join(path.dirname(__dirname),'public',data[0].image))
    
    await competitions.destroy({
        where: {
            id : req.params.id
        }
      });    
    

    return {
        status : 200,
        message : `Data with id ${req.params.id} sucessfully deleted`
    }
}