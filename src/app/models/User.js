const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    user_id: {type: String, default: '', maxLength: 500, required: true},
    user_first_name: {type: String, default: '', maxLength: 500},
    user_last_name: {type: String,default: '', maxLength: 500},
    user_email: {type: String, default: '', maxLength: 500},
    user_phone: {type: String, default: '', maxLength: 500},
    user_address: {type: String, default: '', maxLength: 500},
    user_dob: {type: String, default: '', maxLength: 500},
    user_gender: {type: String, default: '', maxLength: 500},
    user_img: {type: String, default: '', maxLength: 500},
    account_id: {type: String, default: '', maxLength: 500},
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('user', User, 'user');