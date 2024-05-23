const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatType = new Schema({
    seat_type_id: {type: String, default: '', maxLength: 500},
    seat_type_name: {type: String, default: '', maxLength: 500},
    seat_type_price: {type: Number, default: 0, maxLength: 10},
});

module.exports = mongoose.model('seat_type', SeatType, 'seat_type');