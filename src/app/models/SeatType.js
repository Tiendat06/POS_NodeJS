const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatType = new Schema({
    seat_type_id: {type: String, default: '', maxLength: 500},
    seat_type_name: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('seat_type', SeatType, 'seat_type');