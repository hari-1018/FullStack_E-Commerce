const express = require('express');
const wishlistRouter = express.Router();
const authorize = require('../middlewares/authorize') ;

const { addWishlist,
        viewWishlist,
        removeWishlist,
        clearWishlist,
      } = require('../controllers/wishlist_Controller');


wishlistRouter.use(authorize);

wishlistRouter.route("/:id")
    .post(addWishlist)
    .get(viewWishlist)
    .delete(removeWishlist);

wishlistRouter.get('/:id/clear', clearWishlist);

module.exports = wishlistRouter;