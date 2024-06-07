const Account = require("../models/Account");
const User = require("../models/User");

class LogService{

    // [POST}] /log/login
    async checkLogin(req, res, next, formData, error){
        var email = formData.email;
        var pwd = formData.password;
        var isError = false;
        return new Promise((resolve, reject) => {
            if(email == undefined || email == '' || pwd == undefined || pwd == ''){
                reject(error);
            }else{
                resolve(formData);
            }
        })
        .then((form) => {
            return User.findOne({'user_email': form.email, deleted: false});
        })
        .then((user) => {
            return Account.findOne({'account_id': user.account_id, 'account_password': pwd});
        })
        .then((account) => {
            // console.log(account);
            if(account){
                if(account.role_id != 3){
                    return true;
                }else{
                    return false;
                }
            } else {
                return false;
            }
        })
        .catch((err) => {
            return false;
        });
        // return isError == false ? true : false;
    }

}

module.exports = new LogService