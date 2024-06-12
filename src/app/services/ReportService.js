const orderDetailsRepository = require("../repository/OrderDetailsRepository");
const reportRepository = require("../repository/ReportRepository");

class ReportService{

    async index(req){

        return reportRepository.findOrderAndOrderDetailsAndPayment(req)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    sumOfTotalQuantity(list_quantity){
        let totalQuantitySum = 0;
        for (const result of list_quantity) {
            totalQuantitySum += result.totalQuantity;
        }
        return totalQuantitySum;
    }

    sumOfTotalAmount(payment_list_amount){
        let TotalAmountSum = 0;
        for (const result of payment_list_amount) {
            TotalAmountSum += result.total_amount;
        }
        return TotalAmountSum;
    }

    sumOfProfit(product_list_profit){
        let totalProfit = 0;
        for (const result of product_list_profit) {
            totalProfit += (result.totalAmount - result.totalAmountImport);
        }
        return totalProfit;
    }

    async view_orders_details(requestJson){
        var order_id = requestJson.order_id;
        return orderDetailsRepository.findOrderDetailsAndProductByOrderId(order_id)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new ReportService;