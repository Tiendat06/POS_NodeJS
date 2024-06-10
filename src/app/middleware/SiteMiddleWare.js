const siteController = require("../controllers/SiteController");
const customerRepository = require("../repository/CustomerRepository");

class SiteMiddleWare{

    // [GET] /
    index(req, res, next){
        if (req.session.account) {
            siteController.index(req, res, next);
        } else{
            res.redirect('log/login');
        }
    }

    // [POST] /home/order
    home_order(req, res, next){
        var formData = req.body;
        var product_id = formData['product_id_choose-quan'];
        var quantity = formData['chooseQuantityBackdrop'];

        if(product_id == undefined || product_id == '' ||
            quantity == undefined || quantity == ''
        ){
            res.redirect('/');
        } else {
            siteController.home_order(req, res, next, formData);
        }
    }

    // [POST] /home/delete_order
    home_delete_order(req, res, next){
        var formData = req.body;
        var order_list_id = formData['order_list_id_delete'];

        if(order_list_id == undefined || order_list_id == ''){
            res.redirect('/');
        } else{
            siteController.home_delete_order(req, res, next, formData);
        }
    }

    // [POST] /home/find_customer_by_phone
    async find_customer_by_phone(req, res, next){
        var requestJson = req.body;
        var responseData = {
            'fail': 'Customer not found !!',
            'empty': 'Please fill in phone number field',
            'email': 'Email has been contained'
        }

        var customer_phone = requestJson.customer_phone;

        if(customer_phone == undefined || customer_phone == ''){
            // res.json(responseData.fail);
            return res.render('site/find_cus_by_phone', {
                customerIsExist: false,
                errorInfo: responseData.empty,
                isAjax: true
            })
        } else if(!await customerRepository.checkCustomerPhoneIsExist(customer_phone)){
            // res.json(responseData.phone);
            return res.render('site/find_cus_by_phone', {
                customerIsExist: false,
                errorInfo: responseData.fail,
                isAjax: true
            })
        } else{
            // console.log('find by phone: ', customer_phone);
            siteController.find_customer_by_phone(req, res, next, customer_phone, responseData);
        }
    }

    accumulate_customer_order(req, res, next){
        
    }

    // [POST] /home/add_customer
    async add_customer(req, res, next){
        var requestJson = req.body;
        var responseData = {
            'success': 'Add Successfully !!',
            'fail': 'Add failed !!',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained',
            'phone': 'Phone has been contained'
        }

        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;

        if(firstname == undefined || firstname == '' ||
            lastname == undefined || lastname == '' ||
            phone == undefined || phone == '' ||
            email == undefined || email == '' ||
            gender == undefined || gender == '' ||
            dob == undefined || dob == '' ||
            address == undefined || address == ''
        ){
            res.json(responseData.empty);
        } else if(await customerRepository.checkCustomerPhoneIsExist(phone)){
            res.json(responseData.phone);
        } else {
            siteController.add_customer(req, res, next, requestJson, responseData);
        }

    }
}

module.exports = new SiteMiddleWare;