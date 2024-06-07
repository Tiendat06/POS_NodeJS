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
}

module.exports = new CustomerController;