const express = require('express');
const customerMiddleWare = require('../app/middleware/CustomerMiddleWare');
const customerController = require('../app/controllers/CustomerController');
const router = express.Router();

// [GET] /customer
router.get('/', customerMiddleWare.index);

// [POST] /customer/view_order
router.post('/view_order', customerController.view_order);

// [POST] /customer/view_order_details
router.post('/view_order_details', customerController.view_order_details);

// [PUT] /customer/edit
router.put('/edit', customerMiddleWare.edit_customer);

// [GET] /customer/:page
router.get('/:page', customerMiddleWare.index);

module.exports = router;