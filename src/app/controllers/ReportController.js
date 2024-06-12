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
            console.log(paymentInfos);
            var order_list_quantity = paymentInfos[1];
            var totalProductQuantity = reportService.sumOfTotalQuantity(order_list_quantity);
            console.log("product quantity: "+totalProductQuantity);

            var payment_list_amount = paymentInfos[2];
            var totalAmount = reportService.sumOfTotalAmount(payment_list_amount);
            console.log("totalAmount: "+totalAmount);

            var product_list_amount = paymentInfos[3];
            var totalProfit = reportService.sumOfProfit(product_list_amount);
            console.log("totalProfit: "+totalProfit);

            res.render('report/report', {
                orderList: multipleMongooseToObj(result.result),
                currentPage: result.page,
                totalPages: pagesArray,
                totalOrder: paymentInfos[0],
                totalProductQuantity: totalProductQuantity,
                totalAmount: totalAmount,
                totalProfit: totalProfit
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
}

module.exports = new ReportController;