const express = require('express');
const errorResolver = require('./middlewares/errorResolver');
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const accountRoutes = require('./routes/accountRoutes')
const adminRoutes = require('./routes/adminRoutes');

app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//User Side
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/account", accountRoutes);


//Admin Side
app.use("/api/admin", adminRoutes);


//Invalid Routes
app.all("*", (req,res,next)=>{
    const error = new customError("Error Not Found", 404);
    next(error);
})


app.use(errorResolver);


module.exports = app;