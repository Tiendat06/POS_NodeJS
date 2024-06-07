const express = require('express');
const customerMiddleWare = require('../app/middleware/CustomerMiddleWare');
const router = express.Router();

// [GET] /customer
router.get('/', customerMiddleWare.index);

// [GET] /customer/:page
router.get('/:page', customerMiddleWare.index);

module.exports = router;