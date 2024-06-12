const express = require('express');
const router = express.Router();
const reportMiddleWare = require('../app/middleware/ReportMiddleWare');
const reportController = require('../app/controllers/ReportController');

// [GET] /report
router.get('/', reportMiddleWare.index);

// [POST] /report/view_orders_details
router.post('/view_orders_details', reportMiddleWare.view_orders_details);

// [POST] /report/filter_table_by_date
router.post('/filter_table_by_date', reportMiddleWare.filter_table_by_date);

// [POST] /report/filter_payment_by_date
router.post('/filter_payment_by_date', reportMiddleWare.filter_payment_by_date);

// [POST] /report/pagination_AJAX/:page
router.post('/pagination_AJAX/:page', reportController.pagination_AJAX);

// [GET] /report/:page
router.get('/:page', reportMiddleWare.index);

module.exports = router;