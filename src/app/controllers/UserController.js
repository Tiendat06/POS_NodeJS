const { mongooseToObj, multipleMongooseToObj } = require("../../utils/mongoose");
const userService = require("../services/UserService");
const userBuilder = require("../models/BuilderPattern/User/UserBuilder")
const cloudinary = require('cloudinary');
const User = require("../models/User");

class UserController{

    // [GET] /user
    index(req, res, next){
        userService.index()
        .then(userList => {
            if(userList){
                res.render("user/user", {
                    userList: multipleMongooseToObj(userList)
                })
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            res.redirect("/error", {
                error: err
            });
        })
    }

    // [POST, AJAX] /user/add
    add_user(req, res, next, requestJson, responseData){
        userService.add_user(next, requestJson)
        .then(result => {
            if(result[0].length > 0 && result[1].length > 0){
                return res.json(responseData.success);
            } else{
                throw new Error(responseData.fail);
            }
        })
        .catch(err => {
            // console.log(err);
            return res.json(err);
        })
    }

    // [PUT, AJAX] /user/edit
    edit_user(req, res, next, requestJson, responseData){
        userService.edit_user(requestJson)
        .then(result => {
            if(result.modifiedCount > 0){
                res.json(responseData.success)
            } else{
                throw new Error(responseData.fail)
            }
        })
        .catch(err => {
            res.json(err);
        })
    }

    // [DELETE, AJAX] /user/delete
    delete_user(req, res, next, requestJson, responseData){
        userService.delete_user(requestJson)
        .then(result => {
            if(result.deletedCount > 0){
                res.json(responseData.success);
            } else{
                throw new Error(responseData.fail);
            }
        })
        .catch(err => {
            res.json(err);
        })
    }

    // [GET] /user/info
    async user_info(req, res, next){
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
        console.log('hi world');
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