const paypal = require('paypal-rest-sdk');
const paymentService = require('../../../services/PaymentService');

class PaypalMethod{
    async pay(req, res){
        // paymentService.insertPayment(req, requestJson, 3)
        // .then(result => {
        //     console.log(result);
        // })
        // .catch(error => {
        //     console.log(error);
        // })
        return new Promise((resolve, reject) => {
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:3000/success",
                    "cancel_url": "http://localhost:3000/cancel"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": "item",
                            "sku": "item",
                            "price": "1.00",
                            "currency": "USD",
                            "quantity": 1
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": "1.00"
                    },
                    "description": "This is the payment description."
                }]
            };
    
            paypal.payment.create(create_payment_json, async function(error, payment) {
                if (error) {
                    reject(error);
                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            resolve({ forwardLink: payment.links[i].href });
                        }
                    }
                }
            });
        });        
    }
}

module.exports = PaypalMethod;