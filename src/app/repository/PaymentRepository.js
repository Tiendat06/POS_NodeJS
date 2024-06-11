const Payment = require("../models/Payment");

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
}

module.exports = new PaymentRepository;