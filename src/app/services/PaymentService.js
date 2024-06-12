const Order = require("../models/Order");
const Payment = require("../models/Payment");
const { findOne } = require("../models/User");
const customerRepository = require("../repository/CustomerRepository");
const orderRepository = require("../repository/OrderRepository");
const paymentRepository = require("../repository/PaymentRepository");
const Customer = require('../models/Customer');

class PaymentService {
    async insertPayment(req, requestJson, payment_method_id) {
        const order_id = req.session.order_id;
        const payment_id = await paymentRepository.AUTO_PAY_ID();
        var customer_phone_number = requestJson.customer_phone_number;
        var customer_id = '';
        // console.log(customer_id);
        if (customer_phone_number != undefined && customer_phone_number != '') {
            var customer = await customerRepository.findCustomerByPhoneNumber(customer_phone_number);
            if (customer) {
                customer_id = customer.customer_id;
            }
        }

        var totalBill = requestJson.totalBill;
        var given_change = requestJson.given_change;
        var customer_given = requestJson.customer_given;

        var payment = {
            payment_id: payment_id,
            order_id: order_id,
            payment_method_id: payment_method_id,
            total_amount: totalBill,
            change_given: given_change,
        };

        var promiseUpdatePoint = new Promise(async (resolve, reject) => {

            if (customer_id != "") {
                customerRepository.updateCustomerPoint(customer_id);
                resolve();
            }
        });

        return Promise.all([
            Payment.insertMany(payment),
            orderRepository.updateOrderWhilePaySuccess(order_id, customer_id),
            promiseUpdatePoint,
        ])
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
    }
}

module.exports = new PaymentService();
