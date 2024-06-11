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
            console.log("Result: "+result);
            if(result){
                return res.render('customer/view_order', {
                    customerOrder: multipleMongooseToObj(result),
                    isAjax: true,
                })
            } 
            // else{
            //     throw new Error();
            // }
        })
        .catch(error => {
            console.log(error);
            // return res.render('customer/view_order', {
            //     isAjax: true
            // })
        })
    }
}

module.exports = new CustomerController;