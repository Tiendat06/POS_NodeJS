const { multipleMongooseToObj } = require("../../utils/mongoose");
const customerService = require("../services/CustomerService");

class CustomerController{

    // [GET] /customer
    index(req, res, next){
        customerService.index(req)
        .then(result => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);

            res.render('customer/customer', {
                customerList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray
            });
        })
        .catch(err => {
            console.log(err);
            res.render('error/error', {
                error: err
            })
        });
    }

    // [POST] /customer/view_order
    async view_order(req, res, next){
        var requestJson = req.body;
        return customerService.view_order(requestJson)
        .then(result => {
            console.log(result);
            return res.render('customer/view_order', {
                customerOrder: multipleMongooseToObj(result),
                isAjax: true,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    // [POST] /customer/view_order_details
    async view_order_details(req, res, next){
        var requestJson = req.body;
        return customerService.view_order_details(requestJson)
        .then(result => {
            return res.render('customer/view_order_details', {
                orderDetailsList: multipleMongooseToObj(result),
                isAjax: true,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    // [PUT] /customer/edit
    async edit_customer(req, res, next, requestJson, responseData){
        return customerService.edit_customer(requestJson)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.json(responseData.success);
            }
            return res.json(responseData.fail);
        })
        .catch(error => {
            console.log(error);
            return res.json(responseData.fail);
        })
    }
}

module.exports = new CustomerController;