
class ReportController{

    // [GET] /report
    index(req, res, next){
        res.render('report/report');
    }
}

module.exports = new ReportController;