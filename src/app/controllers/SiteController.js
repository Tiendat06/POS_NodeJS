const { multipleMongooseToObj, mongooseToObj } = require('../../utils/mongoose');
const productService = require('../services/ProductService');
const orderService = require('../services/OrderService');
const orderRepository = require('../repository/OrderRepository');
const userRepository = require('../repository/UserRepository');
const customerService = require('../services/CustomerService');
const paymentMethodFactory = require('../models/Factory/PaymentMethodFactory');
const PaymentMethodStrategy = require('../models/Strategy/PaymentMethod/PaymentMethodStrategy');
const paypal = require('paypal-rest-sdk');
const paymentService = require('../services/PaymentService');
const customerRepository = require('../repository/CustomerRepository');
const paymentRepository = require('../repository/PaymentRepository');

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

    // [GET] /success
    async success(req, res, next){
        if(req.query.PayerID){
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;
        
            const execute_payment_json = {
                payer_id: payerId
            };
        
            paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
                if (error) {
                    console.log(error);
                    throw error;
                } else {

                    // console.log('Pay pal success');
                    return res.render('site/success');
                }
            });

        } else{
            // paymentService.insertPayment(req, 1)
            // .then(result => {
            //     console.log(result);
            // })
            // .catch(error => {
            //     console.log(error);
            // })
            // delete req.session.customer_id;
            // delete req.session.totalBill;
            // delete req.session.given_change;
            // delete req.session.customer_given;
            // console.log('Cash success');

            return res.render('site/success');
        }

    }

    // [GET] /fail
    fail(req, res, next){
        res.render('site/fail');
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

    // [POST] /home/home_payment
    async home_payment(req, res, next){
        var requestJson = req.body;
        var payment_method_name = requestJson.payemnt_method;
        // console.log(payment_method_name);

        var payment = await paymentRepository.findPaymentMethodIdByName(payment_method_name);
        var payment_id = payment.payment_method_id;
        // console.log(payment_id);

        var payment = paymentMethodFactory.createPaymentMethod(payment_method_name);
        var payment_processor = await new PaymentMethodStrategy(payment).pay(req, res);
        // console.log(payment_processor);
        paymentService.insertPayment(req, requestJson, payment_id)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
        delete req.session.order_id;
        return res.json(payment_processor);
    }

    // [POST] /home/filter_product
    async filter_product(req, res, next, requestJson){
        return productService.filter_product(requestJson)
        .then(result => {
            if(result){
                return res.render('site/filter_product', {
                    isAjax: true,
                    productList: multipleMongooseToObj(result)
                })
            }
            throw new Error();
        })
        .catch(error => {
            console.log(error);
            return res.render('site/filter_product', {
                isAjax: true,
            })
        })
    }

    async filter_product_by_name(req, res, next){
        var requestJson = req.body;
        return productService.searchProductByRegex(req, requestJson)
        .then(async (result) => {
            console.log(result);
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            
            res.render('site/search_product', {
                productList: multipleMongooseToObj(result.result),
                categoryList: multipleMongooseToObj(result.category),
                currentPage: result.page,
                totalPages: pagesArray,
                isAjax: true
            })
        })
        .catch(error => {
            console.log(error);
            res.render('site/search_product', {
                isAjax: true
            })
        })
    }
}

module.exports = new SiteController;