const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
    room_id: {type:String, default: '', maxLength: 500},
    room_name: {type: String, default: '', maxLength: 500},
    room_total_seats : {type: Number, default: 0, maxLength: 10},
    cluster_id: {type: String, default: '', maxLength: 500},
    film_type: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('room', Room, 'room');