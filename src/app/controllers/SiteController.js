const Film = require("../models/Film");

class SiteController{

    index(req, res, next){
        req.session.home = true;
        res.render('home', {
            home: req.session.home
        });
    }

}

module.exports = new SiteController;