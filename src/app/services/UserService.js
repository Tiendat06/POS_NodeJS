const User = require("../models/User");
const fs = require('fs');

class UserService{

    // [GET] /user/profile
    async profile(req){
        // var isError = false;
        var email = req.session.account;
        return User.findOne({user_email: email})
        .then(result => {
            return result;
        })
        .catch(err => {
            throw new Error("User not found !!");
        });
    }

    async user_info(req){
        var email = req.session.account;
        return User.findOne({user_email: email})
        .then(result => {
            if(result){
                return result
            } else{
                throw new Error();
            }
        })
        .catch(err => {
            return null;
        })
    }

    async edit_profile(req, formData, responseData){

        var firstName = formData.firstName;
        var lastName = formData.lastName;
        var email = formData.email;
        var gender = formData.gender;
        var phone = formData.phone;
        var dob = formData.dob;
        var address = formData.address;
        var img = formData.oldImg;
        
        if(req.file != undefined){
            cloudinary.v2.uploader.upload(req.file.path, { folder: 'POS', resource_type: 'image' })
            .then(result => {
                img = result.url;
                fs.unlink(req.file.path);
            })
        }
        var updateData = {
            'user_first_name': firstName,
            'user_last_name': lastName,
            'user_email': email,
            'user_phone': phone,
            'user_address': address,
            'user_dob': dob,
            'user_gender': gender,
            'user_img': img,
            'updateAt': Date.now()
        }
        return User.updateOne({user_email: email}, updateData)
        .then(result => {
            console.log(result);
            if(result.modifiedCount > 0){
                return responseData.success;
            } else{
                throw new Error(responseData.fail);
            }
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new UserService;