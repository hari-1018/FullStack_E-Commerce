const User = require('../models/user_Model');
const Cart =  require('../models/cart_Model');
const Product = require('../models/product_Model');
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

    const name = product.name;

    const user = await User.findById(userID);
    if(!user){
        throw new CustomError("User not found.", 404);
    }

    const username = user.username; 

    let cart = await Cart.findOne({ userID });
    const totalPrice = product.price * quantity;

    if(!cart){
        cart = new Cart({ 
            userID,
            username,
            products: [{ productID, name, quantity, totalPrice }] 
        });
    }
    
    else{
        const productExists = cart.products.findIndex((p) => p.productID.toString() === productID);
        if(productExists !== -1){
            // cart.products[productExists].name = name;
            cart.products[productExists].quantity += quantity;
            cart.products[productExists].totalPrice = cart.products[productExists].quantity * product.price;

        }else{
            cart.products.push({ productID, name, quantity, totalPrice });
        }
    }

    await cart.save();
    res.status(200).json({status:"Success", cart})
    });



//View the Cart
const viewCart = asyncErrorResolver(async(req,res) =>{

    const userID = req.params.id;
    const cart = await Cart.findOne({ userID }).populate("products.productID","name category mrp discount price");

    if(!cart || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    res.status(200).json({status:"Success", cart})
    });



//Remove from Cart
const removeCart = asyncErrorResolver(async(req,res) =>{

    const userID = req.params.id;
    const {productID} = req.body;

    let cart = await Cart.findOne({ userID });
    if(!cart || !cart.products || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    cart.products = cart.products.filter(product => product.productID.toString() !== productID);

    await cart.save();
    res.status(200).json({status:"Success", cart})
    });



//Updating the Cart
const updateCart = asyncErrorResolver(async(req,res) =>{
    const userID = req.params.id;
    const {productID, quantity} = req.body;

    if(quantity <=0){
        throw new CustomError("Quantity should be greater than zero!", 400);
    }

    let cart = await Cart.findOne({ userID });
    if(!cart || cart.products.length === 0){
        throw new CustomError("Cart is Empty!", 404);
    }

    const productExists = cart.products.findIndex((p) => p.productID.toString() === productID);

    if(productExists === -1){
        throw new CustomError("Product Not Found in Cart", 404);
    }

    const product = await Product.findById(productID);
    if(!product){
        throw new CustomError("No matching products were found.", 404);
    }
    cart.products[productExists].quantity = quantity;
    cart.products[productExists].totalPrice = quantity * product.price;

    await cart.save();
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
    updateCart,
    totalProductsInCart,
    clearCart,
};