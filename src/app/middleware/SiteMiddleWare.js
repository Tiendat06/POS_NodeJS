const siteController = require("../controllers/SiteController");

class SiteMiddleWare{

    // [GET] /
    index(req, res, next){
        if (req.session.account) {
            siteController.index(req, res, next);
        } else{
            res.redirect('log/login');
        }
    }
}

module.exports = new SiteMiddleWare;