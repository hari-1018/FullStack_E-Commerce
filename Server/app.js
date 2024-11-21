const express = require('express');
const errorResolver = require('./middlewares/errorResolver');
const app = express();
const userRoutes = require('./routes/user_Routes');
const productRoutes = require('./routes/product_Routes');
const cartRoutes = require('./routes/cart_Routes');
const wishlistRoutes = require('./routes/wishlist_Routes');
const orderRoutes = require('./routes/order_Routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//User Side
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);


app.use(errorResolver);


module.exports = app;