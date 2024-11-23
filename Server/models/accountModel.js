const mongoose = require('mongoose');

const accountModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    deliveryAddress: {
        housename: { type: String },
        state : { type: String },      
        city : { type: String },
        landmark : { type: String },
        pincode : { type: Number },
    }
});


module.exports = mongoose.model('accounts', accountModel)