const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobilenumber: {
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('users', userModel);
