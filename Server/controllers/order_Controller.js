const Order = require('../models/order_Model');
const Cart = require('../models/cart_Model');
const Product = require('../models/product_Model');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');



//Placing Order
const placingOrder = asyncErrorResolver(async (req,res) =>{
    const userID = req.params.id;
    const { deliveryAddress } = req.body;


    //Products from Cart
    const cart = await Cart.findOne({ userID }).populate("products.productID", "price");
    if(!cart || cart.products.length ===0){
        throw new CustomError("No Products in Cart", 400);
    }

    const totalPrice = cart.products.reduce((total,product) => {
        return total + product.quantity * product.productID.price;
    },0);

    const orderID = `order-${new Date().getTime()}`;

    const order = new Order({
        orderID,
        userID,
        products: cart.products,
        totalProducts: cart.products.length,
        deliveryAddress,
        totalAmount: totalPrice,
    });

    await order.save();

    //Clear Cart after Ordering
    await Cart.findOneAndUpdate({userID},{$set: {products: []}});
    res.status(201).json({
        status: "Success",
        message: "Order Placed Successfully",
        order,
    });
})



//View All orders
const viewOrders = asyncErrorResolver(async (req,res) =>{
    const userID = req.params.id;
    const orders = await Order.find({userID}).populate("products.productID", "name price");

    if(orders.length === 0){
        throw new CustomError("No Orders Found", 404);
    }

    res.status(200).json({
        status: "Success",
        message: "Orders od User has been loaded successfully",
        orders
    });
})



module.exports = { placingOrder, viewOrders }