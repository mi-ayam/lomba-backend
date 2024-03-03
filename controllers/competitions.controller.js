const competitionsService = require("../services/competition.service")

exports.getAllProducts = async(req,res) => {

    const data = await competitionsService.getAllCompetitions(req,res)

    return res.status(data.status).json(data)
}

exports.getCompetitionByID = async (req,res) =>{

    const result = await competitionsService.getCompetitionByID(req,res)
    return res.status(result.status).json(result)
}

exports.addCompetition = async(req,res) =>{
    const result = await competitionsService.addCompetition(req,res)
    return res.status(result.status).json(result)
}

exports.editCompetition = async(req,res) =>{
    const result =  await competitionsService.editCompetition(req,res)
    return res.status(result.status).json(result)
}

exports.deleteCompetition = async(req,res) =>{
    const result = await competitionsService.deleteCompetition(req,res)
    return res.status(result.status).json(result)
}