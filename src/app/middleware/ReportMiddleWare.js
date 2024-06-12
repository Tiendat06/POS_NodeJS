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

    filter_table_by_date(req, res, next){
        var requestJson = req.body;
        var dateFrom = requestJson.dateFrom;
        var dateTo = requestJson.dateTo;

        if(dateFrom == undefined || dateFrom == '' ||
            dateTo == undefined || dateTo == ''
        ){
            res.render('/report/filter_table_by_date', {
                isAjax: true
            })
        } else{
            reportController.filter_table_by_date(req, res, next, requestJson);
        }
    }

    filter_payment_by_date(req, res, next){
        var requestJson = req.body;
        var dateFrom = requestJson.dateFrom;
        var dateTo = requestJson.dateTo;

        if(dateFrom == undefined || dateFrom == '' ||
            dateTo == undefined || dateTo == ''
        ){
            res.render('/report/filter_payment_by_date', {
                isAjax: true
            })
        } else{
            reportController.filter_payment_by_date(req, res, next, requestJson);
        }
    }
}

module.exports = new ReportMiddleWare;