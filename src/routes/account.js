const express = require('express');
const accountMiddleWare = require('../app/middleware/AccountMiddleWare');
const accountController = require('../app/controllers/AccountController');
const router = express.Router();

// [GET] /account
router.get("/", accountMiddleWare.index);

// [PUT] /account/reset_password
router.put("/reset_password", accountMiddleWare.reset_password);

// [PUT] /account/send_mail
router.put("/send_mail", accountMiddleWare.send_mail);

// [GET] /account/change_role/:account_id/:role_id
router.get("/change_role/:account_id/:role_id", accountController.changeRole);

// [GET] /account/:page
router.get("/:page", accountMiddleWare.index);

module.exports = router;