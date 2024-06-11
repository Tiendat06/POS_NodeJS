const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')
const siteMiddleWare = require('../app/middleware/SiteMiddleWare');
// /
// [GET] /
router.get("/", siteMiddleWare.index);

// [POST] /home/order
router.post('/home/order', siteMiddleWare.home_order);

// [POST] /home/delete_order
router.post('/home/delete_order', siteMiddleWare.home_delete_order);

// [POST] /home/add_customer
router.post('/home/add_customer', siteMiddleWare.add_customer);

// [POST] /home/find_customer_by_phone
router.post('/home/find_customer_by_phone', siteMiddleWare.find_customer_by_phone);

// [POST] /home/accumulate_customer_order
router.post('/home/accumulate_customer_order', siteController.accumulate_customer_order);

// [POST] /home/home_payment
router.post('/home/home_payment', siteController.home_payment);

// [GET] /:page
router.get("/:page", siteMiddleWare.index);

module.exports = router;