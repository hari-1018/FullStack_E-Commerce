const express = require('express');
const orderRouter = express.Router();
const authorize = require('../middlewares/auth');
const { placingOrder, viewOrders } = require('../controllers/orderControllers');



orderRouter.use(authorize);

orderRouter.post('/:id/placeorder', placingOrder);
orderRouter.get('/:id', viewOrders);

module.exports = orderRouter;