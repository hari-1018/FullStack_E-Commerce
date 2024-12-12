const express = require('express');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const {getAllUsers, getTotalUsers, getUserById,blockUser,unblockUser,adminAllProducts,adminProductsById,adminProductsByCategory,addProduct,updateProduct,deleteProduct,getAllOrders, getTotalOrders, getRecentOrders, getOrdersByUser,totalProducts,topSellingProducts,totalEarnings,earningsByDate,getTopCustomers} = require('../controllers/adminControllers')
const { getAllProducts, getsProductsById, getsProductsByCategory, getsProductsBySearching} = require('../controllers/productControllers');
const { viewOrders } = require('../controllers/orderControllers');


adminRouter.use(auth);
adminRouter.use(authorize("admin"));

adminRouter.get("/users", getAllUsers);
adminRouter.get("/dashboard/total-users", getTotalUsers);
adminRouter.get("/users/:id", getUserById);
adminRouter.patch("/users/block/:id", blockUser);
adminRouter.patch("/users/unblock/:id", unblockUser);

adminRouter.route("/products")
    .get(adminAllProducts)
    .post(addProduct);

adminRouter.route("/products/:id")
.get(adminProductsById)
.put(updateProduct)
.delete(deleteProduct);

adminRouter.get("/products/category/:categoryname", adminProductsByCategory);

adminRouter.get("/dashboard/total-products", totalProducts);
adminRouter.get("/dashboard/top-products", topSellingProducts);
adminRouter.get("/dashboard/total-earnings", totalEarnings);
adminRouter.get("/dashboard/total-orders", getTotalOrders);
adminRouter.get("/dashboard/recent-orders", getRecentOrders);
adminRouter.get("/dashboard/earnings", earningsByDate);
adminRouter.get("/dashboard/top-customers", getTopCustomers);
adminRouter.get("/orders", getAllOrders);
adminRouter.get("/orders/:id", getOrdersByUser);


module.exports = adminRouter;
