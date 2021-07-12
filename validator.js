const Joi = require('@hapi/joi')

const registerValidator = data =>{
   
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const loginValidator = data =>{
   
    const schema2 = Joi.object({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    })
    return schema2.validate(data)
}

module.exports.registerValidator = registerValidator
module.exports.loginValidator = loginValidator