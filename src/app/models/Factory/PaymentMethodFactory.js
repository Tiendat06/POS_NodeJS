const CashMethod = require('../Strategy/PaymentMethod/CashMethod');
const PaypalMethod = require('../Strategy/PaymentMethod/PaypalMethod');

class PaymentMethodFactory{
    createPaymentMethod(payment_method_name){
        if(payment_method_name == 'Cash')
            return new CashMethod();
        if(payment_method_name == 'Paypal')
            return new PaypalMethod();

        return null;
    }
}

module.exports = new PaymentMethodFactory;