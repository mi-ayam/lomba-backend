const joi = require('joi')

exports.validation = {
    addCompetition : (data) =>{
        const schema = joi.object({
            title : joi.string().required(),
            category : joi.string().required(),
            description : joi.string().required(),
            registration_fee : joi.number().required(),
            prize : joi.number().required(),
            registration_deadline : joi.string().required()
        })
        return schema.validate(data)
    },
    editCompetition : (data) =>{
        const schema = joi.object({
            title : joi.string().required(),
            category : joi.string().required(),
            description : joi.string().required(),
            registration_fee : joi.number().required(),
            prize : joi.number().required(),
            registration_deadline : joi.string().required()
        })
        return schema.validate(data)
    }
}