const { mongooseToObj } = require("../../utils/mongoose");
const userService = require("../services/UserService");
const userBuilder = require("../models/BuilderPattern/User/UserBuilder")
const cloudinary = require('cloudinary');
const User = require("../models/User");

class UserController{

    // [GET] /user
    index(req, res, next){
        res.render("user/user");
    }

    // [GET] /user/info
    user_info(req, res, next){
        return userService.user_info(req)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            return null
        })
    }

    // [GET] /user/profile
    profile(req, res, next){
        // var user_email = req.session.account;
        userService.profile(req)
        .then(user_profile => {
            res.render('user/profile', {
                user_profile: mongooseToObj(user_profile)
            });
        })
        .catch(err => {
            next(err);
        })
    }

    // [POST, AJAX] /user/profile/edit
    edit_profile(req, res, next, formData, responseData){
        userService.edit_profile(req, formData, responseData)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            return res.json(err);
        })
    }
}

module.exports = new UserController;