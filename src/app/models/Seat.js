const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seat = new Schema({
    seat_id: {type: String, default: '', maxLength: 500},
    seat_number: {type: String, default: '', maxLength: 500},
    seat_type: {type: String, default: '', maxLength: 500},
    room_id: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('seat', Seat, 'seat');