const joi = require('joi')

exports.validation = {
    addUser : (data) =>{
        const schema = joi.object({
            firstName : joi.string().required(),
            lastName : joi.string().required(),
            age : joi.number().required(),
            username : joi.string().required(),
            email : joi.string().required(),
            password : joi.string().required()
        })
        return schema.validate(data)
    },
    editUser : (data) =>{
        const schema = joi.object({
            firstName : joi.string().required(),
            lastName : joi.string().required(),
            age : joi.number().required(),
            username : joi.string().required(),
            email : joi.string().required(),
            password : joi.string().required()
        })
        return schema.validate(data)
    }
}