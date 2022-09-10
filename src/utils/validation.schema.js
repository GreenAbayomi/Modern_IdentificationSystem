const Joi = require('joi')

const validationSchema = Joi.object({
    firstName: Joi.string()
    .lowercase()
    .required(),

    lastName: Joi.string()
    .lowercase()
    .required()
})

module.exports = {
    validationSchema
}