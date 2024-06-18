const { multipleMongooseToObj } = require("../../utils/mongoose");
const ReportRepository = require("../repository/ReportRepository");
const reportService = require("../services/ReportService");

class ReportController{

    // [GET] /report
    async index(req, res, next){
        return reportService.index(req)
        .then(async (result) => {
            // console.log(result);
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const paymentInfos = await ReportRepository.getPaymentInfos();
            // console.log(paymentInfos);
            var order_list_quantity = paymentInfos[1];
            var totalProductQuantity = reportService.sumOfTotalQuantity(order_list_quantity);
            // console.log("product quantity: "+totalProductQuantity);

            var payment_list_amount = paymentInfos[2];
            var totalAmount = reportService.sumOfTotalAmount(payment_list_amount);
            // console.log("totalAmount: "+totalAmount);

            var product_list_amount = paymentInfos[3];
            var totalProfit = reportService.sumOfProfit(product_list_amount);
            // console.log("totalProfit: "+totalProfit);

            res.render('report/report', {
                orderList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray,
                totalOrder: paymentInfos[0],
                totalProductQuantity: totalProductQuantity,
                totalAmount: totalAmount.toFixed(2),
                totalProfit: totalProfit.toFixed(2),
            });
        })
        .catch(error => {
            console.log(error);
            res.render('/error', {
                error: error
            })
        })
    }

    // [POST] /report/view_orders_details
    async view_orders_details(req, res, next, requestJson){
        return reportService.view_orders_details(requestJson)
        .then(result => {
            return res.render('report/view_order_details', {
                orderDetailsList: multipleMongooseToObj(result),
                isAjax: true
            })
        })
        .catch(error => {
            console.log(error);
            return res.render('report/view_order_details', {
                isAjax: true
            })
            // return error;
        })
    }

    // [POST] /report/filter_table_by_date
    async filter_table_by_date(req, res, next, requestJson){
        return reportService.filterOrderAndOrderDetailsAndPaymentByDate(req, requestJson)
        .then(async (result) => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const paymentInfos = await ReportRepository.getPaymentInfos();
            // console.log(paymentInfos);
            // console.log(result);
            var order_list_quantity = paymentInfos[1];
            var totalProductQuantity = reportService.sumOfTotalQuantity(order_list_quantity);
            // console.log("product quantity: "+totalProductQuantity);

            var payment_list_amount = paymentInfos[2];
            var totalAmount = reportService.sumOfTotalAmount(payment_list_amount);
            // console.log("totalAmount: "+totalAmount);

            var product_list_amount = paymentInfos[3];
            var totalProfit = reportService.sumOfProfit(product_list_amount);
            // console.log("totalProfit: "+totalProfit);

            return res.render('report/filter_table_by_date', {
                orderList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray,
                totalOrder: paymentInfos[0],
                totalProductQuantity: totalProductQuantity,
                totalAmount: totalAmount,
                totalProfit: totalProfit,
                isAjax: true
            });
        })
        .catch(error => {
            console.log(error);
            return res.render('report/filter_table_by_date', {
                error: error,
                isAjax: true
            })
        })
    }

    // [POST] /report/pagination_AJAX/:page
    async pagination_AJAX(req, res, next){
        var requestJson = req.body;
        return reportService.filterOrderAndOrderDetailsAndPaymentByDate(req, requestJson)
        .then(async (result) => {
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const paymentInfos = await ReportRepository.getPaymentInfos();
            var order_list_quantity = paymentInfos[1];
            var totalProductQuantity = reportService.sumOfTotalQuantity(order_list_quantity);

            var payment_list_amount = paymentInfos[2];
            var totalAmount = reportService.sumOfTotalAmount(payment_list_amount);

            var product_list_amount = paymentInfos[3];
            var totalProfit = reportService.sumOfProfit(product_list_amount);

            res.render('report/report_pagination_ajax', {
                orderList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray,
                totalOrder: paymentInfos[0],
                totalProductQuantity: totalProductQuantity,
                totalAmount: totalAmount,
                totalProfit: totalProfit,
                isAjax: true
            });
        })
        .catch(error => {
            console.log(error);
            res.render('report/report_pagination_ajax', {
                error: error,
                isAjax: true
            })
        })
    }

    async filter_payment_by_date(req, res, next, requestJson){
        return reportService.filterOrderAndOrderDetailsAndPaymentByDate(req, requestJson)
        .then(async (result) => {
            
            const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);
            const paymentInfos = await reportService.getPaymentInfosByDate(req, requestJson);
            console.log(paymentInfos)
            var order_list_quantity = paymentInfos[1];
            var totalProductQuantity = reportService.sumOfTotalQuantity(order_list_quantity);

            var payment_list_amount = paymentInfos[2];
            var totalAmount = reportService.sumOfTotalAmount(payment_list_amount);

            var product_list_amount = paymentInfos[3];
            var totalProfit = reportService.sumOfProfit(product_list_amount);

            res.render('report/filter_payment_by_date', {
                orderList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray,
                totalOrder: paymentInfos[0],
                totalProductQuantity: totalProductQuantity,
                totalAmount: totalAmount,
                totalProfit: totalProfit,
                isAjax: true
            });
        })
        .catch(error => {
            console.log(error);
            res.render('report/filter_payment_by_date', {
                error: error,
                isAjax: true
            })
        })
    }
}

module.exports = new ReportController;