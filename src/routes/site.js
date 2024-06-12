const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')
const siteMiddleWare = require('../app/middleware/SiteMiddleWare');
// /
// [GET] /
router.get("/", siteMiddleWare.index);

// [GET] /success
router.get('/success', siteController.success);

// [GET] /fail
router.get('/fail', siteController.fail);

// [POST] /home/search_product
router.post('/home/search_product', siteController.filter_product_by_name);

// [POST] /home/order
router.post('/home/order', siteMiddleWare.home_order);

// [POST] /home/delete_order
router.post('/home/delete_order', siteMiddleWare.home_delete_order);

// [POST] /home/add_customer
router.post('/home/add_customer', siteMiddleWare.add_customer);

// [POST] /home/find_customer_by_phone
router.post('/home/find_customer_by_phone', siteMiddleWare.find_customer_by_phone);

// [POST] /home/filter_product
router.post('/home/filter_product', siteMiddleWare.filter_product);

// [POST] /home/accumulate_customer_order
router.post('/home/accumulate_customer_order', siteController.accumulate_customer_order);

// [POST] /home/home_payment
router.post('/home/home_payment', siteController.home_payment);

// [POST] /home/:page
router.post('/home/pagination_AJAX/:page', siteController.filter_product_by_name);

// [GET] /:page
router.get("/:page", siteMiddleWare.index);

module.exports = router;