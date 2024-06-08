const express = require('express');
const router = express.Router();
const reportMiddleWare = require('../app/middleware/ReportMiddleWare');
const reportController = require('../app/controllers/ReportController');

// [GET] /report
router.get('/', reportMiddleWare.index);

module.exports = router;