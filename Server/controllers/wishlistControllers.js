const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const asyncErrorResolver = require("../middlewares/asyncErrorResolver");
const CustomError = require("../utils/customErrors");

// Add to Wishlist
const addWishlist = asyncErrorResolver(async (req, res) => {
  const userID = req.params.id;
  const { productID } = req.body;

  const product = await Product.findById(productID);
  if (!product) {
    throw new CustomError("No matching products were found.", 404);
  }

  let wishlist = await Wishlist.findOne({ userID });
  if (!wishlist) {
    wishlist = new Wishlist({ userID, products: [] });
  }

  const existingProductIndex = wishlist.products.findIndex(
    (wish) => wish.productID.equals(productID)
  );

  if (existingProductIndex !== -1) {
    wishlist.products.splice(existingProductIndex, 1);
    await wishlist.save();
    return res.status(200).json({
      status: "Success",
      message: "Removed from Wishlist",
      wishlist,
    });
  }

  wishlist.products.push({ productID });
  await wishlist.save();
  wishlist = await Wishlist.findOne({ userID }).populate("products.productID","name price image_url");


  res.status(200).json({
    status: "Success",
    message: "Added to Wishlist",
    wishlist,
  });
});

// View the Wishlist
const viewWishlist = asyncErrorResolver(async (req, res) => {
  const userID = req.params.id;
  const wishlist = await Wishlist.findOne({ userID }).populate(
    "products.productID",
    "name price image_url"
  );

  if (!wishlist || wishlist.products.length === 0) {
    throw new CustomError("Your wishlist is empty.", 404);
  }

  res.status(200).json({
    status: "Success",
    message: "Wishlist loaded successfully!",
    wishlist,
  });
});

// Remove from Wishlist
const removeWishlist = asyncErrorResolver(async (req, res) => {
  const userID = req.params.id;
  const productID = req.params.productID; // Get the productID from the URL parameter

  let wishlist = await Wishlist.findOne({ userID });
  if (!wishlist) {
    throw new CustomError("Wishlist not found!", 404);
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(
    (wish) => !wish.productID.equals(productID)
  );

  if (initialLength === wishlist.products.length) {
    throw new CustomError("Product not found in wishlist", 404);
  }

  await wishlist.save();
  wishlist = await Wishlist.findOne({ userID }).populate("products.productID", "name price image_url");

  res.status(200).json({
    status: "Success",
    message: "Removed from Wishlist",
    wishlist,
  });
});


// Clear the Wishlist
const clearWishlist = asyncErrorResolver(async (req, res) => {
  const userID = req.params.id;
  const wishlist = await Wishlist.findOne({ userID });

  if (!wishlist) {
    throw new CustomError("Wishlist not found!", 404);
  }

  wishlist.products = [];
  await wishlist.save();
  res.status(200).json({
    status: "Success",
    message: "Wishlist cleared",
    wishlist,
  });
});

module.exports = {
  addWishlist,
  viewWishlist,
  removeWishlist,
  clearWishlist,
};
