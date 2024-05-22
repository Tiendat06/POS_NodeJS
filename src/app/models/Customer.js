const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    customer_id: {type: String, maxLength: 500, require},
    customer_first_name: {type: String, default: '', maxLength: 500},
    customer_last_name: {type: String, default: '', maxLength: 500},
    customer_email: {type: String, default: '', maxLength: 500},
    customer_phone_number: {type: String, default: '', maxLength: 500},
    customer_address: {type: String, default: '', maxLength: 500},
    customer_dob: {type: Date, default: '', maxLength: 500},
    customer_gender: {type: String, default: '', maxLength: 500},
    account_id: {type: String, default: '', maxLength: 500},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},

});

module.exports = mongoose.model('customer', Customer, 'customer');