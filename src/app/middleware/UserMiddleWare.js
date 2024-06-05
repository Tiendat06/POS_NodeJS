const userController = require("../controllers/UserController");

class UserMiddleWare{

    // [GET] /user
    index(req, res, next){
        if(req.session.account){
            userController.index(req, res, next);
        } else{
            res.redirect("/");
        }
    }

    // [GET] /user/profile
    profile(req, res, next){
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
    edit_profile(req, res, next){
        var formData = req.body;
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields'
        }

        var firstName = formData.firstName;
        var lastName = formData.lastName;
        var email = formData.email;
        var gender = formData.gender;
        var phone = formData.phone;
        var dob = formData.dob;
        var address = formData.address;
        var img = formData.oldImg;

        if(firstName == null || firstName == undefined
            || lastName == null || lastName == undefined
            || email == null || email == undefined
            || gender == null || gender == undefined
            || phone == null || phone == undefined
            || dob == null || dob == undefined
            || address == null || address == undefined
            || img == null || img == undefined
        ){
            res.json(responseData.empty);
        } else{
            userController.edit_profile(req, res, next, formData, responseData);
        }
    }
}

module.exports = new UserMiddleWare;