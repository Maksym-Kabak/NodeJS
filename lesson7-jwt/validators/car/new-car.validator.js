const Joi = require('joi');

const currentYear = new Date().getFullYear();

module.exports = Joi.object().keys({
    producer: Joi.string().trim().alphanum().min(2).max(255).required(),
    model: Joi.string().trim().alphanum().min(2).max(255).required(),
    price: Joi.number().positive().integer().required(),
    year: Joi.number().integer().min(1885).max(currentYear).required()
});
