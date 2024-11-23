const express = require('express');
const productRouter = express.Router();

const { getAllProducts, getsProductsById, getsProductsByCategory, getsProductsBySearching} = require('../controllers/productControllers');
      

productRouter.get('/searchterm', getsProductsBySearching);
productRouter.get('/category/:categoryname', getsProductsByCategory);
productRouter.get('/:id', getsProductsById);
productRouter.get('/', getAllProducts);

module.exports = productRouter;