const { required } = require('joi');
const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    flip_image_url: {
        type: String,
        required: true
    },
    in_stock: {
        type: Boolean,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    additional_details:{
        type: String,
        required: true
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