const reportController = require('../controllers/ReportController');

class ReportMiddleWare{

    // [GET] /report
    index(req, res, next){
        if(req.session.account){
            reportController.index(req, res, next);
        } else {
            res.redirect('/');
        }
    }
}

module.exports = new ReportMiddleWare;