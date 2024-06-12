// const Account = require("../models/Account");
// const Category = require("../models/Category");
// const Counter = require("../models/Counter");
// const Customer = require("../models/Customer");
// const CustomerVoucher = require("../models/CustomerVoucher");
// const Order = require("../models/Order");
// const OrderDetails = require("../models/OrderDetails");
// const Payment = require("../models/Payment");
// const PaymentMethod = require("../models/PaymentMethod");
// const Product = require("../models/Product");
// const Role = require("../models/Role");
// const User = require("../models/User");
// const Voucher = require("../models/Voucher");
// const { error } = require("./ErrorController");

const logServices = require('../services/LogService');
const userService = require('../services/UserService');

class LogController {
    // [GET] /log/login
    login(req, res, next) {
        var notInMain = true;
        res.render("log/login", {
            notInMain: notInMain,
        });
    }

    // [POST] /log/login
    async login_POST(req, res, next){
        var formData = req.body;
        var error = 'Invalid email or password or your account has been banned !!';
        if(await logServices.checkLogin(req, res, next, formData, error) == true){
            req.session.account = formData.email;
            var user_info = await userService.user_info(req);
            req.session.role_id = user_info.result.role_id;
            res.redirect('/');
        } else{
            var notInMain = true;
            res.render('log/login', {
                error: error,
                notInMain: notInMain,
            })
        }
    }

    // [GET] /log/register
    register(req, res, next) {
        var notInMain = true;
        res.render("log/register", {
            notInMain: notInMain,
        });
    }

    // [GET] /log/logout
    logout(req, res, next){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            } else{
                res.redirect('/');
            }
        });
    }

    // [GET] /log/change_password
    change_password(req, res, next){
        res.render('log/change_password');
    }

    // [PUT] /log/change_password_PUT
    async change_password_PUT(req, res, next, requestJson, responseData){
        return logServices.change_password_PUT(req, requestJson)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.json(responseData.success);
            }
            return res.json(responseData.fail);
        })
        .catch(error => {
            console.log(error);
            return res.json(responseData.fail);
        })
    }
}

module.exports = new LogController();
