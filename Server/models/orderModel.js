const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [{   
        productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
        },
        quantity : {
            type: Number,
            required: true,
            default: 1,
        },
        }],
    orderID: {
        type: String,
        required: true,
    },
    orderedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        housename: { type: String},
        state : { type: String},      
        city : { type: String},
        landmark : { type: String, required: true},
        pincode : { type: Number, required: true},

    }
})


module.exports = mongoose.model('orders', orderModel)