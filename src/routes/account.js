const express = require('express');
const accountMiddleWare = require('../app/middleware/AccountMiddleWare');
const router = express.Router();

// [GET] /account
router.get("/", accountMiddleWare.index);

module.exports = router;