const userService = require("../services/users.service")
const {validation} = require("../validations/user.validation")

exports.getAllUsers = async(req,res) => {
    const data = await userService.getAllUsers(req,res)
    return res.status(data.status).json(data)
}

exports.getUserByID = async (req,res) =>{
    const result = await userService.getUserByID(req,res)
    return res.status(result.status).json(result)
}

exports.createUser = async(req,res) =>{

    const {error} = validation.addUser(req.body)
    
    if(error){
        return res.status(400).json({
            status : 400,
            message : error.details[0].message
        })
    }

    const result = await userService.createUser(req,res)
    return res.status(result.status).json(result)
}

exports.editUser = async(req,res) =>{
    const {error} = validation.addUser(req.body)
    
    if(error){
        return res.status(400).json({
            status : 400,
            message : error.details[0].message
        })
    }

    const result =  await userService.editUser(req,res)
    return res.status(result.status).json(result)
}

exports.deleteUser = async(req,res) =>{
    const result = await userService.deleteUser(req,res)
    return res.status(result.status).json(result)
}