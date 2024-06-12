const Payment = require("../models/Payment");
const PaymentMethod = require("../models/PaymentMethod");

class PaymentRepository{
    async AUTO_PAY_ID() {
        const lastPayment = await Payment.findOne().sort({ payment_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastPayment) {
            const lastIdNumber = parseInt(lastPayment.payment_id.replace('PAY', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `PAY${newIdNumber.toString().padStart(7, '0')}`;
    }

    async findPaymentMethodIdByName(payment_method_name){
        return PaymentMethod.findOne({payment_name: payment_method_name})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new PaymentRepository;