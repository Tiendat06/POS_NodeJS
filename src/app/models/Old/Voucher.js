const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema({
    voucher_id: {type: String, default: '', maxLength: 500},
    voucher_name: {type: String, default: '', maxLength: 500},
    voucher_expire: {type: String, default: '', maxLength: 500},
    voucher_discount: {type: String, default: '', maxLength:500},
    voucher_description: {type: String, default: '', maxLength: 500},
    voucher_photo: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('voucher', Voucher, 'voucher');