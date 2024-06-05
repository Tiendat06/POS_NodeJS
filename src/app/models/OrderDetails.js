const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetails = Schema({
    order_list_id: {type: String, default: '', maxLength: 500, required: true},
    order_id: {type: String, default: '', maxLength: 500},
    product_id: {type: String, default: '', maxLength: 500},
    quantity: {type: Number, default: '', maxLength: 500},
});

module.exports = mongoose.model('order_details', OrderDetails, 'order_details');