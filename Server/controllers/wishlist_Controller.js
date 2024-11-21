const Wishlist = require('../models/wishlist_Model');
const Cart =  require('../models/cart_Model');
const Product = require('../models/product_Model');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');



// Add to Wishlist
const addWishlist = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const {productID} = req.body;

    const product = await Product.findById(productID);
    if(!product){
        throw new CustomError("No matching products were found.", 404);
    }
    const name = product.name;

    let wishlist = await Wishlist.findOne({ userID });
    if(!wishlist){
        wishlist = new Wishlist({ 
            userID,
            products: [] 
        });
        await wishlist.save();
        res.status(200).json({status:"Success", message:"Added to Wishlist", wishlist})
    }
    
        const existingWishlist = wishlist.products.findIndex((wish) => wish.productID.toString() === productID);

        if(existingWishlist !== -1){
            wishlist.products.splice(existingWishlist, 1);
            await wishlist.save();
            res.status(200).json({status:"Success", message:"Removed from Wishlist", wishlist})
        }
        else{
            wishlist.products.push({ productID, name });
            await wishlist.save();
            res.status(200).json({status:"Success", message:"Added to Wishlist", wishlist})
        }
    });



//View the Wishlist
const viewWishlist = asyncErrorResolver(async(req,res) =>{

    const userID = req.params.id;
    const wishlist = await Wishlist.findOne({ userID }).populate("products.productID","name category price");

    if(!wishlist){
        throw new CustomError("No Wishlists!", 404);
    }

    res.status(200).json({status:"Success", message:"Wishlist has been loaded successfully!", wishlist})
    });



//Remove from Wishlist
const removeWishlist = asyncErrorResolver(async(req,res) =>{

    const userID = req.params.id;
    const {productID} = req.body;

    let wishlist = await Wishlist.findOne({ userID });
    if(!wishlist){
        throw new CustomError("No Wishlists!", 404);
    }

    const itemsInWishlist = wishlist.products.length;
    wishlist.products = wishlist.products.filter(wish => wish.productID.toString() !== productID);

    if(itemsInWishlist === wishlist.products.length){
        throw new CustomError("Product Not Found in Wishlist", 404);
    }

    await wishlist.save();
    res.status(200).json({status:"Success", message:"Removed from Wishlist", wishlist})
    });



//Clear the Cart
const clearWishlist = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const wishlist = await Wishlist.findOne({ userID });
    if(!wishlist){
        throw new CustomError("No Wishlists!", 404);
    }
    wishlist.products = [];
    await cart.save();
    res.status(200).json({status:"Success", message: "Wishlist Cleared", wishlist})
})

module.exports = {
    addWishlist,
    viewWishlist,
    removeWishlist,
    clearWishlist,
};