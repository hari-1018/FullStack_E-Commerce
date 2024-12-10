// const User = require('../models/userModel');
const Cart =  require('../models/cartModel');
const Product = require('../models/productModel');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');


//Add to Cart 
const addCart = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const {productID, quantity} = req.body;

    const product = await Product.findById(productID);
    if(!product || quantity <=0 ){
        throw new CustomError("No matching products were found.", 404);
    }

    let cart = await Cart.findOne({ userID });
    
    if(!cart){
        const price = product.price;
        const totalPrice = price * quantity;
        cart = new Cart({ 
            userID,
            products: [{ productID, price, quantity, totalPrice }] 
        });
    }
    
    else{
        const productExists = cart.products.findIndex((p) => p.productID.equals(productID));
        if(productExists !== -1){
            cart.products[productExists].quantity += quantity;
            cart.products[productExists].totalPrice = cart.products[productExists].quantity * product.price;

        }else{
            cart.products.push({ productID, price:product.price, quantity, totalPrice: product.price * quantity });
        }
    }

    await cart.save();
    cart = await Cart.findOne({ userID }).populate("products.productID","name image_url price")

    res.status(200).json({status:"Success", cart})
    });



//View the Cart
const viewCart = asyncErrorResolver(async(req,res) =>{

    const userID = req.params.id;
    const cart = await Cart.findOne({ userID }).populate("products.productID","name category mrp discount price image_url");

    if(!cart || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    
    res.status(200).json({status:"Success", cart})
    });



//Remove from Cart
const removeCart = asyncErrorResolver(async(req,res) =>{
    const userID = req.params.id;
    const {productID} = req.params;
    console.log("remove cart", userID, productID);
    let cart = await Cart.findOne({ userID });
    if(!cart){
        throw new CustomError("Cart is Empty!", 404);
    }

    cart.products = cart.products.filter(product => !product.productID.equals(productID));
    await cart.save();
    cart = await Cart.findOne({ userID }).populate("products.productID","name image_url price")
    res.status(200).json({status:"Success", cart})
    });



//Updating the Cart
const increaseCart = asyncErrorResolver(async(req,res) =>{
    const userID = req.params.id;
    const {productID} = req.body;

    let cart = await Cart.findOne({ userID });
    if(!cart || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    const productExists = cart.products.findIndex((p) => p.productID.equals(productID));
    if(productExists === -1){
        throw new CustomError("Product Not Found in Cart", 404);
    }
    const product =  cart.products[productExists];
    cart.products[productExists].quantity += 1;
    cart.products[productExists].totalPrice = cart.products[productExists].quantity * product.price;

    await cart.save();
    cart = await Cart.findOne({ userID }).populate("products.productID","name price image_url")

    res.status(200).json({status:"Success", cart})
    });


//Decreasing the Cart
const decreaseCart = asyncErrorResolver(async(req,res) =>{
    const userID = req.params.id;
    const {productID} = req.body;

    let cart = await Cart.findOne({ userID });
    if(!cart || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    const productExists = cart.products.findIndex((p) => p.productID.equals(productID));
    if(productExists === -1){
        throw new CustomError("Product Not Found in Cart", 404);
    }
    const product =  cart.products[productExists];
    cart.products[productExists].quantity -= 1;
    cart.products[productExists].totalPrice = cart.products[productExists].quantity * product.price;

    await cart.save();
    cart = await Cart.findOne({ userID }).populate("products.productID","name price image_url")

    res.status(200).json({status:"Success", cart})
    });


//Total Products in Cart
const totalProductsInCart = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const cart = await Cart.findOne({ userID });
    if(!cart){
        throw new CustomError("Cart is Empty!", 404);
    }
    const totalProducts = cart.products.length;

    res.status(200).json({status:"Success", totalProducts})
});



//Clear the Cart
const clearCart = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const cart = await Cart.findOne({ userID });
    if(!cart){
        throw new CustomError("Cart is Empty!", 404);
    }
    cart.products = [];
    await cart.save();

    res.status(200).json({status:"Success", message: "Cart Cleared", cart})
})

module.exports = {
    addCart,
    viewCart,
    removeCart,
    increaseCart,
    decreaseCart,
    totalProductsInCart,
    clearCart,
};