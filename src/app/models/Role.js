const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = Schema({
    role_id: {type: Number, default: 1, maxLength: 10, required: true},
    role_name: {type: String, default: '', maxLength: 500}
});

module.exports = mongoose.model('role', Role, 'role');