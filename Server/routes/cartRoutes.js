const express = require('express');
const cartRouter = express.Router();
const authorize = require('../middlewares/auth') ;

const { addCart,
        viewCart,
        removeCart,
        updateCart,
        totalProductsInCart,
        clearCart,
      } = require('../controllers/cartControllers');


cartRouter.use(authorize);

cartRouter.route("/:id")
    .post(addCart)
    .get(viewCart)
    .put(updateCart)
    .delete(removeCart);

cartRouter.get('/:id/total-products', totalProductsInCart);
cartRouter.get('/:id/clear', clearCart);

module.exports = cartRouter;