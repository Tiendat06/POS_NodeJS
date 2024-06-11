const customerController = require("../controllers/CustomerController");
const customerRepository = require("../repository/CustomerRepository");

class CustomerMiddleWare{

    // [GET] /customer
    index(req, res, next){
        if(req.session.account){
            customerController.index(req, res, next);
        }else{
            res.redirect('/');
        } 
    }
    
    // [PUT] /customer/edit
    async edit_customer(req, res, next){
        var requestJson = req.body;
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields',
            'phone': 'Phone has been contained',
        }
        var customer_id = requestJson.customer_id;
        var customer_first_name = requestJson.customer_first_name;
        var customer_last_name = requestJson.customer_last_name;
        var customer_email = requestJson.customer_email;
        var customer_phone = requestJson.customer_phone;
        var customer_address = requestJson.customer_address;
        var customer_dob = requestJson.customer_dob;
        var customer_gender = requestJson.customer_gender;
        var customer_old_phone = requestJson.customer_old_phone;

        if(customer_id == undefined || customer_id == '' ||
            customer_first_name == undefined || customer_first_name == '' ||
            customer_last_name == undefined || customer_last_name == '' ||
            customer_email == undefined || customer_email == '' ||
            customer_phone == undefined || customer_phone == '' ||
            customer_address == undefined || customer_address == '' ||
            customer_dob == undefined || customer_dob == '' ||
            customer_gender == undefined || customer_gender == ''
        ){
            res.json(responseData.empty);
        } else if(await customerRepository.checkCustomerPhoneIsExist(customer_phone) && customer_phone != customer_old_phone){
            res.json(responseData.phone);
        } else {
            customerController.edit_customer(req, res, next, requestJson, responseData);
        }
    }
}

module.exports = new CustomerMiddleWare;