const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController')
const siteMiddleWare = require('../app/middleware/SiteMiddleWare');
// /
// [GET] /
router.get("/", siteMiddleWare.index);

// [GET] /:page
router.get("/:page", siteMiddleWare.index);

module.exports = router;