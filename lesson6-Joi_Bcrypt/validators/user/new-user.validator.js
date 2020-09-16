const Joi = require('joi');
const {EMAIL, PASSWORD} = require('../../configs/regexp.unum');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(50).required(),
    email: Joi.string().regex(EMAIL).max(50).required(),
    password: Joi.string().trim().regex(PASSWORD).required()
})
