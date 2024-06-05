const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const userMiddleWare = require('../app/middleware/UserMiddleWare');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/img')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage}).single('img');

// [GET] /user
router.get("/", userMiddleWare.index);

// [GET] /user/profile
router.get('/profile', userMiddleWare.profile);

// [POST] /user/profile/edit
router.post('/profile/edit', upload, userMiddleWare.edit_profile);

// [GET] /user/profile/info
router.get('/profile/info', userMiddleWare.user_info);

module.exports = router;