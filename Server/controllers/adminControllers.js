const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const customError = require('../utils/customErrors');


//Get All Users
const getAllUsers = asyncErrorResolver(async(req,res)=>{
    const users = await User.find({role: 'user'}).select('-password');
    res.status(200).json({
        status: "Success",
        message: "All Users Fetched Successfully",
        data: users
    });
});


//Get User by ID
const getUserById = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;
    const user = await User.findById(userID);
    if(!user){
        throw new CustomError(`No User Found with ID: ${userID}`, 404);
    }
    res.status(200).json({status: "Success", message: "User Details Loaded Successfully", data:user})
})


//Block a User
const blockUser = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;

    const user = await User.findById(userID);
    if(!user){
        throw new CustomError(`No User Found with ID: ${userID}`, 404);
    }

    if(user.isBlocked){
        throw new CustomError("User is already blocked", 400);
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({status: "Success", message: "Blocked User Successfully", data:user})

})


//Unlock a User
const unblockUser = asyncErrorResolver(async(req,res)=>{
    const userID = req.params.id;

    const user = await User.findById(userID);
    if(!user){
        throw new CustomError(`No User Found with ID: ${userID}`, 404);
    }

    if(!user.isBlocked){
        throw new CustomError("User is not blocked", 400);
    }

    user.isBlocked = false;
    await user.save();

    res.status(200).json({status: "Success", message: "Unblocked User Successfully", data:user})

})


//Get all Products
const adminAllProducts = asyncErrorResolver(async(req,res)=>{
    const allProducts = await Product.find({});

    if(allProducts.length === 0){
        throw new CustomError("No Products Found", 404);
    }

    res.status(200).json({status:"Success", message:"Products Loaded Successfully", data: allProducts})
    });


//Get Products By ID
const adminProductsById = asyncErrorResolver(async(req,res) =>{
    const {id} = req.params;

    const productsById = await Product.findById(id);
    if(!productsById){
        throw new CustomError(`No Products Found with this ${id}`, 404);
    }

    res.status(200).json({status:"Success", message: "Product Details Loaded Successfully", data:productsById})
    });


//Get Products By ID
const adminProductsByCategory = asyncErrorResolver(async(req,res) =>{

    const {categoryname} = req.params;

    if(!categoryname){
        throw new CustomError(`Enter a Category`, 400);
    }

    const productsByCategory = await Product.find({ category: categoryname});

    if(productsByCategory.length === 0){
        throw new CustomError(`No Products Found in ${categoryname} category`, 404);
    }

    res.status(200).json({status:"Success", message:`Products in ${categoryname} category loaded successfully.`, data: productsByCategory})
    });


//Add a product    
const addProduct = asyncErrorResolver(async(req, res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({status: "Success", message: "Product Added Successfully", data: newProduct})
})


//Update a product
const updateProduct = asyncErrorResolver(async(req,res)=>{
    const productID = req.params.id;
    const editProduct = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productID, editProduct,{ new:true });
    if(!updatedProduct){
        throw new CustomError(`No Product Found with ID: ${productID}`, 404);
    }
    res.status(200).json({status: "Success", message: "Product Updated Successfully", data: updatedProduct})
})


//Delete a product
const deleteProduct = asyncErrorResolver(async(req,res)=>{
    const productID = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if(!deletedProduct){
        throw new CustomError(`No Product Found with ID: ${productID}`, 404);
    }
    res.status(200).json({status: "Success", message: "Product Deleted Successfully", data: deletedProduct})
})
