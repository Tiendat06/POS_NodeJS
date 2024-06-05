const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = Schema({
    voucher_id: {type: Number, default: 0, maxLength: 10},
    voucher_name: {type: String, default: '', maxLength: 500},
    voucher_discount: {type: Number, default: '', maxLength: 10},
    voucher_description: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('voucher', Voucher, 'voucher');