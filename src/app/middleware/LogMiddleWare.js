const logController = require('../controllers/LogController');
const AccountRepository = require('../repository/AccountRepository');

class LogMiddleWare{

    // [GET] /log/login
    login(req, res, next){
        if (req.session.account) {
            res.redirect("/");
        } else{
            logController.login(req, res, next);
        }
    }

    // [GET] /log/register
    register(req, res, next){
        if (req.session.account) {
            res.redirect("/");
        } else{
            logController.register(req, res, next);
        }
    }

    change_password(req, res, next){
        if(req.session.account){
            logController.change_password(req, res, next);
        }else{
            res.redirect('/')
        }
    }

    async change_password_PUT(req, res, next){
        var requestJson = req.body;
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields',
            'confirm_pass': 'Please check your new and confirm password again',
            'current_wrong': 'Invalid current password'
        }
        var current_pass = requestJson.current_pass;
        var new_pass = requestJson.new_pass;
        var confirm_pass = requestJson.confirm_pass;

        if(current_pass == undefined || current_pass == '' ||
            new_pass == undefined || new_pass == '' ||
            confirm_pass == undefined || confirm_pass == ''
        ){
            res.json(responseData.empty);
        } else if(new_pass != confirm_pass){
            res.json(responseData.confirm_pass);
        } else if(!await AccountRepository.checkPassword(req, current_pass)){
            res.json(responseData.current_wrong);
        } else {
            logController.change_password_PUT(req, res, next, requestJson, responseData);
        }
    }
}

module.exports = new LogMiddleWare;