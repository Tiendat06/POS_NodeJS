const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = Schema({
    category_id: {type: Number, default: 0, maxLength: 10},
    category_name: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('category', Category, 'category');