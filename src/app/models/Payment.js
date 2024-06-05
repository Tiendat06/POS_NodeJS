const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = Schema({
    payment_id: {type: String, default: '', maxLength: 500, required: true},
    order_id: {type: String, default: '', maxLength: 500},
    payment_method_id: {type: Number, default: 1, maxLength: 10},
    total_amount: {type: Number, default: 0, maxLength: 500},
    change_given: {type: Number, default: 0, maxLength: 500},
});

module.exports = mongoose.model('payment', Payment, 'payment');