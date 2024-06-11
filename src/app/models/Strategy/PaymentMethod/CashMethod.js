const paymentService = require("../../../services/PaymentService");

class CashMethod{
    async pay(req, requestJson){
        return paymentService.insertPayment(req, requestJson, 1)
        .then(result => {
            // console.log(result);
            if(result[0].length > 0 && result[1].modifiedCount > 0){
                return true;
            } 
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }
}

module.exports = CashMethod;