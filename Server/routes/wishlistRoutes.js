const express = require('express');
const wishlistRouter = express.Router();
const authorize = require('../middlewares/auth') ;

const { addWishlist,
        viewWishlist,
        removeWishlist,
        clearWishlist,
      } = require('../controllers/wishlistControllers');


wishlistRouter.use(authorize);

wishlistRouter.route("/:id")
    .post(addWishlist)
    .get(viewWishlist)
    .delete(removeWishlist);

wishlistRouter.get('/:id/clear', clearWishlist);

module.exports = wishlistRouter;