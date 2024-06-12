const userController = require("../controllers/UserController");
const userRepository = require("../repository/UserRepository");

class UserMiddleWare{

    // [GET] /user
    index(req, res, next){
        // const currentPage = req.params['page'] || 1;
        if(req.session.account && req.session.role_id == 1){
            userController.index(req, res, next);
        } else{
            res.redirect("/");
        }
    }

    // [POST, AJAX] /user/add
    async add_user(req, res, next){
        var responseData = {
            'success': 'Add Successfully',
            'fail': 'Add failed',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained',
        }
        var requestJson = req.body;
        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;

        if(await userRepository.checkEmail(email)){
            return res.json(responseData.email);
        }
        else if(firstname != null && firstname != '' &&
            lastname != null && lastname != '' &&
            phone != null && phone != '' &&
            email != null && email != '' &&
            gender != null && gender != '' &&
            dob != null && dob != '' &&
            address != null && address != ''
        ){
            userController.add_user(req, res, next, requestJson, responseData);
        } else{
            return res.json(responseData.empty);
        }

    }

    // [PUT, AJAX] /user/edit
    async edit_user(req, res, next){
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained',
        }
        var requestJson = req.body;
        var user_id = requestJson.user_id;
        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;
        var old_mail = requestJson.old_mail;
        // console.log("Hole: ", requestJson);

        if(old_mail != email && await userRepository.checkEmail(email)){
            return res.json(responseData.email);
        } else if(user_id != null && user_id != '' &&
            firstname != null && firstname != '' &&
            lastname != null && lastname != '' &&
            phone != null && phone != '' &&
            email != null && email != '' &&
            gender != null && gender != '' &&
            dob != null && dob != '' &&
            address != null && address != ''
        ){
            userController.edit_user(req, res, next, requestJson, responseData);
        } else{
            return res.json(responseData.empty);
        }
    }

    // [DELETE, AJAX] /user/delete
    delete_user(req, res, next){
        var responseData = {
            'success': 'Delete Successfully',
            'fail': 'Delete failed',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained',
        }
        var requestJson = req.body;
        var userId = requestJson.userId;
        if(userId != null && userId != ''){
            userController.delete_user(req, res, next, requestJson, responseData);
        } else {
            res.json(responseData.empty);
        }
    }

    // [GET] /user/profile
    profile(req, res, next){
        // console.log('hi world bro !!')
        if(req.session.account){
            userController.profile(req, res, next);
        } else{
            res.redirect('/');
        }
    }

    user_info(req, res, next){
        if(req.session.account){
            userController.user_info(req, res, next);
        }else{
            redirect('/');
        }
    }

    // [POST, AJAX] /user/profile/edit
    async edit_profile(req, res, next){
        var formData = req.body;
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained'
        }

        var firstName = formData.firstName;
        var lastName = formData.lastName;
        var email = formData.email;
        var gender = formData.gender;
        var phone = formData.phone;
        var dob = formData.dob;
        var address = formData.address;
        var img = formData.oldImg;
        var old_email = formData.old_email

        if(firstName == null || firstName == undefined
            || lastName == null || lastName == undefined
            || email == null || email == undefined
            || gender == null || gender == undefined
            || phone == null || phone == undefined
            || dob == null || dob == undefined
            || address == null || address == undefined
            || img == null || img == undefined
            || old_email == null || old_email == undefined
        ){
            res.json(responseData.empty);
        } else if(await userRepository.checkEmail(email) && old_email != email){
            res.json(responseData.email);
        } else{
            userController.edit_profile(req, res, next, formData, responseData);
        }
    }
}

module.exports = new UserMiddleWare;