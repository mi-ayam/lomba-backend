const competitionsService = require("../services/competition.service")
const competitionValidation = require("../validations/competition.validation")
const { imageValidation } = require("../validations/image.validation")

exports.getAllProducts = async(req,res) => {
    const data = await competitionsService.getAllCompetitions(req,res)
    return res.status(data.status).json(data)
}

exports.getCompetitionByID = async (req,res) =>{
    const result = await competitionsService.getCompetitionByID(req,res)
    return res.status(result.status).json(result)
}

exports.addCompetition = async(req,res) =>{
    const {error} = competitionValidation.validation.addCompetition(req.body)
 
    if(error){
        return res.status(400).json({
            status : 400,
            message : error.details[0].message
        })
    }

    const imageVal = imageValidation(req)

    if (imageVal.error){
        return res.status(400).json({
            status : 400,
            message : imageVal.message
        })
    }

    const result = await competitionsService.addCompetition(req,res)

    return res.status(result.status).json(result)
}

exports.editCompetition = async(req,res) =>{
    
    const {error} = competitionValidation.validation.editCompetition(req.body)
    
    if(error){
        return res.status(400).json({
            status : 400,
            message : error.details[0].message
        })
    }

    const imageVal = imageValidation(req)

    if (imageVal.error){
        return res.status(400).json({
            status : 400,
            message : imageVal.message
        })
    }

    const result =  await competitionsService.editCompetition(req,res)
    return res.status(result.status).json(result)
}

exports.deleteCompetition = async(req,res) =>{
    const result = await competitionsService.deleteCompetition(req,res)
    return res.status(result.status).json(result)
}