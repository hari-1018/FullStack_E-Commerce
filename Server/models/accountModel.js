const mongoose = require('mongoose');

const accountModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    profileImage: {
        type: String,
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