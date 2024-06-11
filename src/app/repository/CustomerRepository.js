const Customer = require("../models/Customer");

class CustomerRepository{

    async AUTO_CUS_ID() {
        const lastCustomer = await Customer.findOne().sort({ customer_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastCustomer) {
            const lastIdNumber = parseInt(lastCustomer.customer_id.replace('CUS', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `CUS${newIdNumber.toString().padStart(7, '0')}`;
    }

    async checkCustomerPhoneIsExist(customer_phone){
        return Customer.findOne({customer_phone_number: customer_phone})
        .then(result => {
            if(result){
                return true;
            } 
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async findCustomerByPhoneNumber(customer_phone){
        return Customer.findOne({customer_phone_number: customer_phone})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async updateCustomerPoint(customer_phone){
        var customer = await Customer.findOne({customer_phone_number: customer_phone});
        var customer_point = customer.customer_point;
        var new_customer_point = customer_point + 1;

        return Customer.updateOne({customer_phone_number: customer_phone}, {
            customer_point: new_customer_point
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async updateCustomer(requestJson){
        var customer_id = requestJson.customer_id;
        var customer_first_name = requestJson.customer_first_name;
        var customer_last_name = requestJson.customer_last_name;
        var customer_email = requestJson.customer_email;
        var customer_phone = requestJson.customer_phone;
        var customer_address = requestJson.customer_address;
        var customer_dob = requestJson.customer_dob;
        var customer_gender = requestJson.customer_gender;

        var customer = {
            'customer_first_name': customer_first_name,
            'customer_last_name': customer_last_name,
            'customer_email': customer_email,
            'customer_phone_number': customer_phone,
            'customer_address': customer_address,
            'customer_dob': customer_dob,
            'customer_gender': customer_gender,
            'updateAt': Date.now(),
        }
        return Customer.updateOne({customer_id: customer_id}, customer)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

}

module.exports = new CustomerRepository;