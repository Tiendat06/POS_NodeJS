const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = Schema({
    product_id: {type: String, default: '', maxLength: 500, required: true},
    product_name: {type: String, default: '', maxLength: 500},
    product_description: {type: String, default: '', maxLength: 500},
    quantity: {type: Number, default: 0, maxLength: 10},
    real_price: {type: Number, default: 0, maxLength: 10},
    retail_price: {type: Number, default: 0, maxLength: 10},
    category_id: {type: Number, default: 0, maxLength: 10},
    product_image: {type: String, default: '', maxLength: 500},
    product_barcode: {type: String, default: '', maxLength: 500},
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('product', Product, 'product');