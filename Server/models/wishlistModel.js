const mongoose = require('mongoose');

const wishlistModel = new mongoose.Schema({
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
        }],
});


module.exports = mongoose.model('wishlists', wishlistModel);