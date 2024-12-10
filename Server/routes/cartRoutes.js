const express = require('express');
const cartRouter = express.Router();
const auth = require('../middlewares/auth') ;

const { addCart,
        viewCart,
        removeCart,
        increaseCart,
        decreaseCart,
        totalProductsInCart,
        clearCart,
      } = require('../controllers/cartControllers');


cartRouter.use(auth);

cartRouter.route("/:id")
    .post(addCart)
    .get(viewCart);

cartRouter.delete("/:id/:productID",removeCart);
cartRouter.put('/:id/increase', increaseCart);
cartRouter.put('/:id/decrease', decreaseCart);
cartRouter.get('/:id/total-products', totalProductsInCart);
cartRouter.get('/:id/clear', clearCart);

module.exports = cartRouter;