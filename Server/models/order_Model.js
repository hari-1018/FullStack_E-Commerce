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
        name: {
            type: String,
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
    totalPrice: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        housename: { type: String, required: true},
        state : { type: String, required: true},      
        city : { type: String, required: true},
        landmark : { type: String, required: false},
        pincode : { type: String, required: true},

    }
})


module.exports = mongoose.model('orders', orderModel)