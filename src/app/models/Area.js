const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Area = new Schema({
    area_id: {type: String, default: '', maxLength: 500},
    area_name: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('area', Area, 'area');