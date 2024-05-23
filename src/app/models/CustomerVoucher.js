const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerVoucher = new Schema({
    voucher_id: {type: String, default: '', maxLength: 500},
    customer_id: {type: String, default: '', maxLength: 500},
    customer_voucher_date_created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('customer_voucher', CustomerVoucher, 'customer_voucher');