const express = require('express');
const orderRouter = express.Router();
const authorize = require('../middlewares/authorize');
const { placingOrder, viewOrders } = require('../controllers/order_Controller');



orderRouter.use(authorize);

orderRouter.post('/:id/placeorder', placingOrder);
orderRouter.get('/:id', viewOrders);

module.exports = orderRouter;