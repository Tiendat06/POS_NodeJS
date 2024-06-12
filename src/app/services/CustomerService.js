const Customer = require("../models/Customer");
const OrderDetails = require("../models/OrderDetails");
const customerRepository = require("../repository/CustomerRepository");
const orderDetailsRepository = require("../repository/OrderDetailsRepository");
const orderRepository = require("../repository/OrderRepository");

class CustomerService{

    async index(req){
        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await Customer.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Customer.find({ customer_phone_number: { $exists: true, $ne: "" } })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(result => {
            return {
                result,
                page,
                totalPages,
                totalCount
            };
        }).catch(err => {
            return err;
        })
    }

    async add_customer(requestJson){
        var customer_id = await customerRepository.AUTO_CUS_ID();
        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;

        var customer = {
            'customer_id': customer_id,
            'customer_first_name': firstname,
            'customer_last_name': lastname,
            'customer_email': email,
            'customer_phone_number': phone,
            'customer_address': address,
            'customer_dob': dob,
            'customer_gender': gender,
        }

        return Customer.insertMany(customer)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async findCustomerByPhone(customer_phone){
        return Customer.findOne({customer_phone_number: customer_phone})
        .then(result => {
            if(result){
                return result;
            }
        })
        .catch(error => {
            console.log(error);
            return error;
        })
    }

    async view_order(requestJson){
        var customer_id = requestJson.customer_id;
        // console.log("Cus_id: "+customer_id);
        return orderRepository.findOrderAndOrderDetailsByCustomerId(customer_id)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async view_order_details(requestJson){
        var order_id = requestJson.order_id;
        return orderDetailsRepository.findOrderDetailsAndProductByOrderId(order_id)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async edit_customer(requestJson){
        return customerRepository.updateCustomer(requestJson)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new CustomerService;