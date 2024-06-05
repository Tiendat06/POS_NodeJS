const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerVoucher = Schema({
    customer_voucher_id: {type: String, default: '', maxLength: 500, requried: true},
    voucher_id: {type: Number, default: 1, maxLength: 10},
    customer_id: {type: String, default: '', maxLength: 500},
    date_used: {type: Date, default: Date.now}
});

module.exports = mongoose.model('customer_voucher', CustomerVoucher, 'customer_voucher');