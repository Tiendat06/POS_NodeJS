const express = require('express');
const customerMiddleWare = require('../app/middleware/CustomerMiddleWare');
const customerController = require('../app/controllers/CustomerController');
const router = express.Router();

// [GET] /customer
router.get('/', customerMiddleWare.index);

// [POST] /customer/view_order
router.post('/view_order', customerController.view_order);

// [GET] /customer/:page
router.get('/:page', customerMiddleWare.index);

module.exports = router;