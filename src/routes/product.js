const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const productMiddleWare = require('../app/middleware/ProductMiddleWare');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single('img');


// [GET] /product
router.get('/', productMiddleWare.index);

// [POST] /product/add
router.post('/add', upload, productMiddleWare.add_product);

// [PUT] /product/edit
router.put('/edit', upload, productMiddleWare.edit_product);

// [DELETE] /product/delete
router.delete('/delete', productMiddleWare.delete_product);

// [GET] /product/:page
router.get('/:page', productMiddleWare.index);

module.exports = router;