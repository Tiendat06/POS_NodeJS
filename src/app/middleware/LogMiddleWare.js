const logController = require('../controllers/LogController');

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
}

module.exports = new LogMiddleWare;