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

// [GET] /:page
router.get("/:page", siteMiddleWare.index);

module.exports = router;