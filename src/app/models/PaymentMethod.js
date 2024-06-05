const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentMethod = Schema({
    payment_method_id: {type: Number, default: 1, maxLength: 10, required: true},
    payment_name: {type: String, default: '', maxLength: 500}
});

module.exports = mongoose.model('payment_method', PaymentMethod, 'payment_method');