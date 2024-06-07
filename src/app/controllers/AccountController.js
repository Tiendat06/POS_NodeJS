const { multipleMongooseToObj } = require("../../utils/mongoose");
const accountService = require("../services/AccountService");
const userService = require("../services/UserService");

class AccountController{

    // [GET] /account
    async index(req, res, next){
        return accountService.index(req)
        .then(result => {
            // console.log(result);
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);

            return res.render("account/account", {
                accountList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray
            });
        }).catch(err => {
            console.log(err);
            return res.render('error/error', {
                error: err
            });
        })
    }

    // [GET] /account/change_role/:role_id
    async changeRole(req, res, next){
        return accountService.changeRole(req)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.redirect("/account");
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            console.log(err);
            return err;
        })
    }

    // [PUT, AJAX] /account/reset_password
    async reset_password(req, res, next, requestJson, responseData){
        return accountService.reset_password(requestJson)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.json(responseData.success)
            } else{
                throw new Error();
            }
        })
        .catch(err => {
            console.log(err);
            return res.json(responseData.fail);
        })
    }
    // [PUT, AJAX] /account/send_mail
    async send_mail(req, res, next, requestJson, responseData){
        var email = requestJson.email;
        req.session.user_email = email;

        return userService.send_mail(req, requestJson)
        .then(result => {
            return res.json(responseData.success);
        })
        .catch(err => {
            console.log(err);
            return res.json(responseData.fail);
        })
    }
}

module.exports = new AccountController;