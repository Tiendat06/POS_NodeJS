const Customer = require("../../Customer");

class CustomerBuilder{
    #customer_id;
    #customer_first_name;
    #customer_last_name;
    #customer_email;
    #customer_phone_number;
    #customer_address;
    #customer_dob;
    #customer_gender;
    #customer_account_id;

    setCustomerId(customer_id){
        this.#customer_id = customer_id;
        return this;
    }

    setCustomerFirstName(customer_first_name){
        this.#customer_first_name = customer_first_name;
        return this;
    }

    setCustomerLastName(customer_last_name){
        this.#customer_last_name = customer_last_name;
        return this;
    }

    setCustomerEmail(customer_email){
        this.#customer_email = customer_email;
        return this;
    }

    setCustomerPhoneNumber(customer_phone_number){
        this.#customer_phone_number = customer_phone_number;
        return this;
    }

    setCustomerAddress(customer_address){
        this.#customer_address = customer_address;
        return this;
    }

    setCustomerDob(customer_dob){
        this.#customer_dob = customer_dob;
        return this;
    }

    setCustomerGender(customer_gender){
        this.#customer_gender = customer_gender;
        return this;
    }

    setCustomerAccountId(account_id){
        this.#customer_account_id = account_id;
        return this;
    }

    build(){
        return new Customer(this.#customer_id, this.#customer_first_name, this.#customer_last_name, this.#customer_email, 
            this.#customer_phone_number, this.#customer_address, this.#customer_dob, this.#customer_gender, this.#customer_account_id);
    }
}

module.exports = new CustomerBuilder();