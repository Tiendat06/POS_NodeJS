const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = Schema({
    order_id: {type: String, default: '', maxLength: 500, required: true},
    user_id: {type: String, default: '', maxLength: 500},
    date_created: {type: Date, default: Date.now},
    note: {type: String, default: '', maxLength: 500},
    customer_id: {type: String, default: '', maxLength: 500}
});

module.exports = mongoose.model('order', Order, 'order');