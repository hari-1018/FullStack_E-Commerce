const Joi = require('joi');

const userRegister = (data) => {
    const Schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    mobilenumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid('admin','user').default('user'),
    });
    return Schema.validate(data);
}

const userLogin = (data) => {
    const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    });
    return Schema.validate(data);
}

module.exports = {userRegister, userLogin}