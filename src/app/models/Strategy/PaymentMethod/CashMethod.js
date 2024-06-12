const paymentService = require("../../../services/PaymentService");

class CashMethod{
    async pay(req, res){
        return new Promise(async (resolve, reject) => {
            resolve({ forwardLink: 'http://localhost:3000/success' });
        }) 
    }
}

module.exports = CashMethod;