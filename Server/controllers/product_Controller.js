const Product = require('../models/product_Model');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');

//Get All Products
const getAllProducts = asyncErrorResolver(async(req,res)=>{

    const allProducts = await Product.find({});

    if(allProducts.length === 0){
        throw new CustomError("No Products Found", 404);
    }

    res.status(200).json({status:"Success", allProducts})
    });


//Get Products By ID
const getsProductsById = asyncErrorResolver(async(req,res) =>{

    const {id} = req.params;

    const productsById = await Product.findById(id);

    if(!productsById){
        throw new CustomError(`No Products Found with this ${id}`, 404);
    }

    res.status(200).json({status:"Success", productsById})
    });


//Get Products By ID
const getsProductsByCategory = asyncErrorResolver(async(req,res) =>{

    const {categoryname} = req.params;

    if(!categoryname){
        throw new CustomError(`Enter a Category`, 400);
    }

    const productsByCategory = await Product.find({ category: categoryname});

    if(productsByCategory.length === 0){
        throw new CustomError(`No Products Found in ${categoryname}`, 404);
    }

    res.status(200).json({status:"Success", productsByCategory})
    });


//Get Products by Searching
const getsProductsBySearching = asyncErrorResolver(async(req,res) =>{

    const {searchterm} = req.query;

    if(!searchterm){
        throw new CustomError(`Enter a Search Term`, 400);
    }

    const productsBySearching = await Product.find({
        $or: [
            { name: { $regex: searchterm, $options: 'i' } },
            { description: { $regex: searchterm, $options: 'i' } },
            { category: { $regex: searchterm, $options: 'i' } }
        ]
    });

    if(productsBySearching.length === 0){
        throw new CustomError(`No Products Found for ${searchterm}`, 404);
    }

    res.status(200).json({status:"Success", productsBySearching})
    });


module.exports = {
    getAllProducts,
    getsProductsById,
    getsProductsByCategory,
    getsProductsBySearching,
};