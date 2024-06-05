class AccountController{

    // [GET] /account
    index(req, res, next){
        res.render("account/account");
    }
}

module.exports = new AccountController;