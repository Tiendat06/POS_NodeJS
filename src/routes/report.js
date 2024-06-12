const express = require('express');
const router = express.Router();
const reportMiddleWare = require('../app/middleware/ReportMiddleWare');
const reportController = require('../app/controllers/ReportController');

// [GET] /report
router.get('/', reportMiddleWare.index);

// [POST] /report/view_orders_details
router.post('/view_orders_details', reportMiddleWare.view_orders_details);

// [GET] /report/:page
router.get('/:page', reportMiddleWare.index);

module.exports = router;