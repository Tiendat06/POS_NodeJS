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

    view_orders_details(req, res, next){
        var requestJson = req.body;
        var order_id = requestJson.order_id;

        if(order_id == undefined || order_id == ''){
            res.render('report/view_order', {
                isAjax: true
            })
        } else{
            reportController.view_orders_details(req, res, next, requestJson);
        }
    }
}

module.exports = new ReportMiddleWare;