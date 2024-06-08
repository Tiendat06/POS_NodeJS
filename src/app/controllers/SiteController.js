const { multipleMongooseToObj } = require('../../utils/mongoose');
const productService = require('../services/ProductService');

class SiteController {

    // [GET] /
    index(req, res, next) {
        productService.index(req, 6)
        .then(result => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);

            res.render('home', {
                productList: multipleMongooseToObj(result.result),
                categoryList: multipleMongooseToObj(result.category),
                currentPage: result.page,
                totalPages: pagesArray
            });
        })
        .catch(err => {
            console.log(err);
            res.render('error/error', {
                error: err
            })
        })
    }

}

module.exports = new SiteController;