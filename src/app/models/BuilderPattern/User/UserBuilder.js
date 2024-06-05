const User = require("../../User");

class UserBuilder{
    #user_id;
    #user_first_name;
    #user_last_name;
    #user_email;
    #user_phone;
    #user_address;
    #user_dob;
    #user_gender;
    #user_img;
    #user_account_id;

    setUserId(user_id){
        this.#user_id = user_id;
        return this;
    }

    setUserFirstName(user_first_name){
        this.#user_first_name = user_first_name;
        return this;
    }

    setUserLastName(user_last_name){
        this.#user_last_name = user_last_name;
        return this;
    }

    setUserEmail(user_email){
        this.#user_email = user_email;
        return this;
    }

    setUserPhone(user_phone){
        this.#user_phone = user_phone;
        return this;
    }

    setUserAddress(user_address){
        this.#user_address = user_address;
        return this;
    }

    setUserDob(user_dob){
        this.#user_dob = user_dob;
        return this;
    }

    setUserGender(user_gender){
        this.#user_gender = user_gender;
        return this;
    }

    setUserImg(user_img){
        this.#user_img = user_img;
        return this;
    }

    setUserAccountId(user_account_id){
        this.#user_account_id = user_account_id;
        return this;
    }

    build(){
        return new User(this.#user_id, this.#user_first_name, this.#user_last_name, this.#user_email, 
            this.#user_phone, this.#user_address, this.#user_dob, this.#user_gender, this.#user_img, this.#user_account_id);
    }
}

module.exports = new UserBuilder();