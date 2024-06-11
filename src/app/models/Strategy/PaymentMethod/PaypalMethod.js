
class PaypalMethod{
    pay(req, requestJson){
        console.log('paypal');
        return true;
    }
}

module.exports = PaypalMethod;