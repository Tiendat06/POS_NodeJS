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

}

module.exports = new CustomerRepository;