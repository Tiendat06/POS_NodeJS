const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    account_id: {type: String, require, maxLength: 500, required: true},
    account_password: {type: String, default: null, maxLength: 500},
    account_code_forgot: {type: String, default: '', maxLength: 500},
    role_id: {type: Number, default: 1, maxLength: 10},
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('account', Account, 'account');