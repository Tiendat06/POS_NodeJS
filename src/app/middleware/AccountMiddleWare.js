const accountController = require("../controllers/AccountController");

class AccountMiddleWare{

    // [GET] /account
    index(req, res, next){
        if(req.session.account){
            accountController.index(req, res, next);
        }else{
            res.redirect("/");
        }
    }

    // [PUT] account/reset_password
    reset_password(req, res, next){
        var responseData = {
            'success': 'Reset Successfully',
            'fail': 'Reset failed',
            'empty': 'Lack of data !!',
            'email': 'Email has been contained',
        }
        var requestJson = req.body;
        var account_id = requestJson.account_id;
        var user_email = requestJson.user_email;

        if(account_id != null && account_id != '' &&
            user_email != null && user_email != ''
        ){  
            accountController.reset_password(req, res, next, requestJson, responseData);
        }else{
            res.json(responseData.empty);
        }
        
    }

    // [PUT] account/send_mail
    send_mail(req, res, next){
        var responseData = {
            'success': 'Send Successfully',
            'fail': 'Send failed',
            'empty': 'Lack of data !!',
            'email': 'Email has been contained',
        }
        var requestJson = req.body;
        var account_id = requestJson.account_id;
        var user_email = requestJson.email;
        
        if(account_id != null && account_id != '' &&
            user_email != null && user_email != ''
        ){  
            accountController.send_mail(req, res, next, requestJson, responseData);
        }else{
            res.json(responseData.empty);
        }
    }
}

module.exports = new AccountMiddleWare;