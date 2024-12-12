const { required } = require('joi');
const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    mrp: {
        type: Number,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    image_url: {
        type: String,
    },
    flip_image_url: {
        type: String,
    },
    in_stock: {
        type: Boolean,
    },
    discount:{
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    additional_details:{
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("products", productModel)