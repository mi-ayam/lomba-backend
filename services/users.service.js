const {users} = require('../models');

exports.getAllUsers = async(req,res) =>{
    const data = await users.findAll()

    return {
        status : 200,
        data : data,
        messages : "Success get all data"
    }
}

exports.getUserByID = async (req,res) =>{
    const data = await users.findOne({
        where :{
            id : req.params.id
        }
    })
    if(data){
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

exports.createUser = async (req,res) =>{
    const {firstName, lastName, age, username, email, password} = req.body
    const data  = await users.create({
        firstName,
        lastName,
        age,
        username,
        email,
        password
    })

    return {
        status : 200,
        data : data,
        message : "Success add user"
    }
}

exports.editUser = async (req,res) =>{
    const {firstName, lastName, age, username, email, password} = req.body

    const data  = await users.update({
        firstName,
        lastName,
        age,
        username,
        email,
        password
    },{
        where : {
            id : req.params.id
        }
    })

    if(data[0] === 1){
        return {
            status : 200,
            message : "Success update user"
        }
    }else{
        return {
            status : 404,
            message : "Data doesnt exists"
        }
    }
}

exports.deleteUser = async (req,res) =>{
    const data = await users.destroy({
        where : {
            id : req.params.id
        }
    })

    if(data === 1){
        return {
            status : 200,
            message : "Success delete user"
        }
    }else{
        return {
            status : 404,
            message : "Data doesnt exists"
        }
    }
}