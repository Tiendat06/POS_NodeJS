const Order = require("../models/Order");
const Payment = require("../models/Payment");
const { findOne } = require("../models/User");
const customerRepository = require("../repository/CustomerRepository");
const orderRepository = require("../repository/OrderRepository");
const paymentRepository = require("../repository/PaymentRepository");
const Customer = require('../models/Customer');
const voucherRepository = require("../repository/VoucherRepository");

class PaymentService {
    async insertPayment(req, requestJson, payment_method_id) {
        const order_id = req.session.order_id;
        const payment_id = await paymentRepository.AUTO_PAY_ID();
        var customer_phone_number = requestJson.customer_phone_number;
        var voucher_id = requestJson.customer_voucher_id;
        var customer_id = '';

        if (customer_phone_number != undefined && customer_phone_number != '') {
            var customer = await customerRepository.findCustomerByPhoneNumber(customer_phone_number);
            if (customer) {
                customer_id = customer.customer_id;
                if(voucher_id != undefined && voucher_id != ''){
                    var customer_voucher_id = await voucherRepository.AUTO_CSV_ID();
                    var voucher = await voucherRepository.findVoucherById(voucher_id);
                    var customer_point = customer.customer_point;
                    var pointReduced = parseInt(customer_point) - parseInt(voucher.voucher_discount);
                    await voucherRepository.updateCustomerVoucher(customer_voucher_id, customer_id, voucher_id);
                    await customerRepository.updateCustomerPoint(customer_phone_number, pointReduced);
                }
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
                customerRepository.updateCustomerPointPayment(customer_id);
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
