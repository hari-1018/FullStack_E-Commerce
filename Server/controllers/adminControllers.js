const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');


//Get All Users
const getAllUsers = asyncErrorResolver(async(req,res)=>{
    const users = await User.find({role: 'user'}).select('-password');
    res.status(200).json({status: "Success", message: "All Users Fetched Successfully", data: users });
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


//Unblock a User
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


//Get Products By Category
const adminProductsByCategory = asyncErrorResolver(async(req,res) =>{

    const {categoryname} = req.params;

    if(!categoryname){
        throw new CustomError(`Enter a Category`, 400);
    }

    const productsByCategory = await Product.find({
        category: { $regex: new RegExp(`^${categoryname}$`, 'i') }
    });;

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


//All Orders
const getAllOrders = asyncErrorResolver(async(req,res)=>{
    const orders = await Order.find({})
    .populate("userID", "username email")
    .populate("products.productID", "name price");
    if(orders.length === 0){
        throw new CustomError("No Orders Found", 404);
    }
    res.status(200).json({status: "Success", message: "All Orders Fetched Successfully", data: orders})
})


// Orders for a specific user
const getOrdersByUser = asyncErrorResolver(async (req, res) => {
    const userID  = req.params.id;

    if (!userID) {
        throw new CustomError("User ID is required", 400);
    }

    const userOrders = await Order.find({ userID: userID })
        .populate("userID", "username email")
        .populate("products.productID", "name price");

    if (userOrders.length === 0) {
        throw new CustomError(`No Orders Found for User with ID: ${userID}`, 404);
    }

    res.status(200).json({
        status: "Success",
        message: `Orders for User with ID: ${userID} fetched successfully.`,
        data: userOrders,
    });
});



//Total Products Purchased
const totalProductsPurchased = asyncErrorResolver(async(req,res)=>{
    const totalProducts = await Order.aggregate([
        { $unwind: "$products" },
        { $group: { _id: null, totalProducts: { $sum: "$products.quantity" } } }
    ])
    res.status(200).json({status: "Success", message: "Total Products Purchased", data: totalProducts})
})


//Top Selling Products
const topSellingProducts = asyncErrorResolver(async (req, res) => {
    const topProducts = await Order.aggregate([
        { $unwind: "$products" },
        {
            $group: {
                _id: "$products.productID",
                totalSold: { $sum: "$products.quantity" },
            },
        },
        { $sort: { totalSold: -1 } }, 
        { $limit: 10 },
        {
            $lookup: {
                from: "products", 
                localField: "_id", 
                foreignField: "_id",
                as: "productDetails", 
            },
        },
        {
            $unwind: "$productDetails", 
        },
        {
            $project: {
                _id: 1,
                totalSold: 1, 
                "productDetails.name": 1,
                "productDetails.price": 1, 
                "productDetails.category": 1, 
            },
        },
    ]);

    res.status(200).json({status: "Success",message: "Top Selling Products",data: topProducts});
});



//Total Revenue
const totalEarnings = asyncErrorResolver(async(req,res)=>{
    const earnings = await Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);
    res.status(200).json({status: "Success", message: "Total Revenue", data: earnings})
})

//Earnings by month
const earningsByDate = asyncErrorResolver(async (req, res) => {
    const { startDate, endDate } = req.query.body;
    if (!startDate || !endDate) {
        throw new CustomError("Start date and end date are required", 400);
    }
    const earnings = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            },
        },
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    res.status(200).json({ status: "Success", message: "Revenue by Date Range", data: earnings });
});


//Top Customers
const getTopCustomers = asyncErrorResolver(async (req, res) => {
    const topCustomers = await Order.aggregate([
        {
            $group: {
                _id: "$userID", 
                totalSpent: { $sum: "$totalAmount" }, 
            },
        },
        {
            $sort: { totalSpent: -1 }, 
        },
        {
            $limit: 10, 
        },
        {
            $lookup: { 
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userDetails",
            },
        },
        {
            $unwind: "$userDetails", 
        },
        {
            $project: { 
                _id: 0,
                userID: "$_id",
                totalSpent: 1,
                username: "$userDetails.username",
                email: "$userDetails.email",
                mobile: "$userDetails.mobilenumber",
            },
        },
    ]);

    res.status(200).json({status: "Success", message: "Top Customers Retrieved Successfully", data: topCustomers});
});


module.exports = {
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    adminAllProducts,
    adminProductsById,
    adminProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    getOrdersByUser,
    totalProductsPurchased,
    topSellingProducts,
    totalEarnings,
    earningsByDate,
    getTopCustomers,
}