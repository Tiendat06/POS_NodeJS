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

// [GET] /log/logout
router.get('/logout', logController.logout);


module.exports = router;