const Joi = require('joi');

const userRegister =  Joi.object({
    username: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    mobilenumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid('admin','user').default('user'),
    });

const userLogin = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(5).required(),
    });

    module.exports = {userRegister, userLogin}