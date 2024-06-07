const User = require("../models/User");
const fs = require('fs');
const cloudinary = require('cloudinary');
const userRepository = require('../repository/UserRepository');
const accountRepository = require("../repository/AccountRepository");
const UserBuilder = require("../models/BuilderPattern/User/UserBuilder");
const Account = require("../models/Account");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
dotenv.config();

class UserService{

    // [GET] /user
    async index(req){
        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await User.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return User.find({deleted: false})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(result => {
            if(result){
                return {
                    result,
                    page,
                    totalPages,
                    totalCount
                };
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            return err;
        })
    }

    async add_user(next, requestJson){
        var user_id = await userRepository.AUTO_USE_ID();
        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;
        var img = "https://res.cloudinary.com/dervs0fx5/image/upload/v1709054146/cl0hmsqdjl1lwnahek0i.png";
        var account_id = await accountRepository.AUTO_ACC_ID();

        var user = {
            'user_id': user_id,
            'user_first_name': firstname,
            'user_last_name': lastname,
            'user_phone': phone,
            'user_email': email,
            'user_gender': gender,
            'user_dob': dob,
            'user_address': address,
            'user_img': img,
            'account_id': account_id
        }

        var account = {
            'account_id': account_id,
            'account_password': email,
            'account_code_forgot': "",
            'jwt': '',
            'role_id': 3
        }

        return Promise.all([
            User.insertMany(user),
            Account.insertMany(account),
        ])
        .then((result) => {
            return result; 
        })
        .catch(err => {
            return err;
        })
    }

    async send_mail(req, requestJson){
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_SERVER,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
        var email = requestJson.email;
        const jsonWebToken = crypto.randomBytes(64).toString('hex');
        const token = jwt.sign(
            { email }, 
            jsonWebToken,
            { expiresIn: '5m' }
        );
        const url = `http://localhost:${process.env.PORT}/user/user_verify?token=${token}`;
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your account by clicking the link below, you only have 5 minites to do this action:</p>\n<p><a href="${url}">${url}</a></p>`,
        }

        return transporter.sendMail(mailOptions, async (error, info) => {
            if(error){
                console.log("Error: ", error);
                return false;
            } else{
                // var user_email = req.session.account;
                var user = await User.findOne({user_email: email});
                await Account.updateOne({account_id: user.account_id}, {
                    jwt: jsonWebToken
                });
                return true;
            }
        });
        
    }

    async user_verify(req, res){
        try{
            const token = req.query.token;
            var user_email = req.session.user_email;
            delete req.session.user_email;
            var user = await User.findOne({user_email: user_email});
            var account = await Account.findOne({account_id: user.account_id});

            const decoded = jwt.verify(token, account.jwt);
            await Account.updateOne({account_id: user.account_id}, {
                role_id: 2
            });
            res.render("log/verified", {
                notInMain: true,
            });
        } catch (error){
            console.log(error);
            res.render("log/failed", {
                notInMain: true
            });
        }
    }

    async edit_user(requestJson){
        var user_id = requestJson.user_id;
        var firstname = requestJson.firstname;
        var lastname = requestJson.lastname;
        var phone = requestJson.phone;
        var email = requestJson.email;
        var gender = requestJson.gender;
        var dob = requestJson.dob;
        var address = requestJson.address;
        // console.log(requestJson);

        var user = {
            'user_first_name': firstname,
            'user_last_name': lastname,
            'user_email': email,
            'user_phone': phone,
            'user_address': address,
            'user_dob': dob,
            'user_gender': gender,
        }

        return User.updateOne({user_id: user_id}, user)
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async delete_user(requestJson){
        var user_id = requestJson.userId;
        var user = await User.findOne({user_id: user_id});
        return Promise.all([
            User.deleteOne({user_id: user_id}), 
            Account.deleteOne({account_id: user.account_id})
        ])
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async soft_delete_user(requestJson){
        var user_id = requestJson.userId;
        var user = await User.findOne({user_id: user_id});
        return Promise.all([
            User.updateOne({user_id: user_id}, {deleted: true, updateAt: Date.now()}),
            Account.updateOne({account_id: user.account_id}, {deleted: true, updateAt: Date.now()})
        ])
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
    }

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
        var old_email = formData.old_email;

        if(req.file != undefined){
            img = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'POS' })
            .then((result) => {
                fs.unlinkSync(req.file.path);
                return result.url;
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