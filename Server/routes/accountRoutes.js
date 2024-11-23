const express = require('express');
const { getAccount, editAccount } = require('../controllers/accountControllers');
const accountRouter = express.Router();
const auth = require('../middlewares/auth');



accountRouter.use(auth);

accountRouter.route('/:id')
 .get(getAccount)
 .put(editAccount);


module.exports = accountRouter;