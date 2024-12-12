const express = require("express");
const wishlistRouter = express.Router();
const authorize = require("../middlewares/auth");

const {
  addWishlist,
  viewWishlist,
  removeWishlist,
  clearWishlist,
} = require("../controllers/wishlistControllers");

wishlistRouter.use(authorize);

wishlistRouter.post("/:id", addWishlist);
wishlistRouter.get("/:id", viewWishlist);
wishlistRouter.delete("/:id/:productID", removeWishlist);
wishlistRouter.delete("/:id/clear", clearWishlist);

module.exports = wishlistRouter;
