const { multipleMongooseToObj, mongooseToObj } = require('../../utils/mongoose');
const productService = require('../services/ProductService');
const orderService = require('../services/OrderService');
const orderRepository = require('../repository/OrderRepository');
const userRepository = require('../repository/UserRepository');
const customerService = require('../services/CustomerService');

class SiteController {

    // [GET] /
    async index(req, res, next) {
        var user_email = req.session.account;
        var user = await userRepository.findUserByEmail(user_email);
        var user_id = user.user_id;
        if(await orderRepository.checkIsOrdering(user_id)){
            var order = await orderRepository.findOrderByUserIdAndDateCreated(user_id);
            req.session.order_id = order.order_id;
        }
        productService.index(req, 6)
        .then(async (result) => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const orderList = await orderService.get_order_in_home(req);
            const totalBill = await orderService.calculate_total_bill(req);

            // console.log(totalBill[0].totalAmount);
            res.render('home', {
                productList: multipleMongooseToObj(result.result),
                categoryList: multipleMongooseToObj(result.category),
                currentPage: result.page,
                totalPages: pagesArray,
                orderList: multipleMongooseToObj(orderList),
                totalBill: totalBill[0].totalAmount
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
        orderService.home_delete_order(req, formData)
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

    // [POST] /home/add_customer
    add_customer(req, res, next, requestJson, responseData){
        customerService.add_customer(requestJson)
        .then(result => {
            if(result.length > 0){
                res.json(responseData.success);
            } else {
                res.json(responseData.fail);
            }
        })
        .catch(error => {
            console.log(error);
            res.json(responseData.fail);
        })
    }

    // [POST] /home/find_customer_by_phone
    async find_customer_by_phone(req, res, next, customer_phone, responseData){
        return customerService.findCustomerByPhone(customer_phone)
        .then(result => {
            // console.log(result);
            return res.render('site/find_cus_by_phone', {
                customer_info: mongooseToObj(result),
                customerIsExist: true,
                isAjax: true
            })
        })
        .catch(error => {
            console.log(error);
            return res.render('site/find_cus_by_phone', {
                customerIsExist: false,
                errorInfo: responseData.fail,
                isAjax: true
            })
        })
    }

    // [POST] /home/accumulate_customer_order
    accumulate_customer_order(req, res, next){
        var requestJson = req.body;
        var customer_phone = requestJson.customer_phone;

        customerService.updateCustomerPoint(customer_phone)
        .then(result => {
            if(result.modifiedCount > 0){
                res.redirect('/');
            }else{
                res.redirect('/error');
            }
        })
        .catch(error => {
            console.log(error);
            res.redirect('/error');
        })
    }
}

module.exports = new SiteController;