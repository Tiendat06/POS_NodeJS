const express = require('express');
const logController = require('../app/controllers/LogController');
const logMiddleWare = require('../app/middleware/LogMiddleWare');
const router = express.Router();

// [GET] /log/login
router.get('/login', logMiddleWare.login);

// [POST] /log/login
router.post('/login', logController.login_POST);

// [GET] /log/register
router.get('/register', logMiddleWare.register);

// [GET] /log/change_password
router.get('/change_password', logMiddleWare.change_password);

// [PUT] /log/change_password
router.put('/change_password', logMiddleWare.change_password_PUT);

// [GET] /log/logout
router.get('/logout', logController.logout);


module.exports = router;