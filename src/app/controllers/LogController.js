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
}

module.exports = new LogController();
