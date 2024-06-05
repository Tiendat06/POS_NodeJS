const Account = require("../models/Account");
const User = require("../models/User");

class LogService{

    // [POST}] /log/login
    checkLogin(req, res, next, formData, error){
        var email = formData.email;
        var pwd = formData.password;
        var isError = false;
        new Promise((resolve, reject) => {
            if(email == undefined || email == '' || pwd == undefined || pwd == ''){
                reject(error);
            }else{
                resolve(formData);
            }
        })
        .then((form) => {
            return User.findOne({'user_email': form.email});
        })
        .then((user) => {
            if (!user) {
                throw new Error(error);
            }else{
                return Account.findOne({'account_id': user.account_id});
            }
        })
        .then((account) => {
            if(account){
                isError = false;
            } else {
                throw new Error(error);
            }
        })
        .catch((err) => {
            isError = true;
            return false;
        });
        return isError == false ? true : false;
    }

}

module.exports = new LogService