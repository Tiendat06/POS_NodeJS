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
}

module.exports = new AccountMiddleWare;