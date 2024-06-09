const { multipleMongooseToObj } = require('../../utils/mongoose');
const productService = require('../services/ProductService');
const orderService = require('../services/OrderService');

class SiteController {

    // [GET] /
    index(req, res, next) {
        productService.index(req, 6)
        .then(async (result) => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const orderList = await orderService.get_order_in_home(req);

            // console.log(orderList);
            res.render('home', {
                productList: multipleMongooseToObj(result.result),
                categoryList: multipleMongooseToObj(result.category),
                currentPage: result.page,
                totalPages: pagesArray,
                orderList: orderList
            });
        })
        .catch(err => {
            console.log(err);
            res.render('error/error', {
                error: err
            })
        })
    }

    // [POST] /home/order
    home_order(req, res, next, formData){
        orderService.home_order(req, formData)
        .then(result => {
            res.redirect('/');
        })
        .catch(error => {
            console.log(error);
            res.render('error/error', {
                error: error
            })
        })
    }

    // [POST] /home/delete_order
    home_delete_order(req, res, next, formData){
        orderService.home_delete_order(formData)
        .then(result => {
            if(result){
                res.redirect('/');
            }else{
                throw new Error();
            }
        })
        .catch(error => {
            console.log(error);
            res.render('error/error', {
                error: error
            })
        })
    }
}

module.exports = new SiteController;