const express = require('express');
const cartRouter = express.Router();
const authorize = require('../middlewares/authorize') ;

const { addCart,
        viewCart,
        removeCart,
        updateCart,
        totalProductsInCart,
        clearCart,
      } = require('../controllers/cart_Controller');


cartRouter.use(authorize);

cartRouter.route("/:id")
    .post(addCart)
    .get(viewCart)
    .put(updateCart)
    .delete(removeCart);

cartRouter.get('/:id/totalProducts', totalProductsInCart);
cartRouter.get('/:id/clear', clearCart);

module.exports = cartRouter;