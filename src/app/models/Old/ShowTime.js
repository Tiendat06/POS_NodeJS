const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowTime = new Schema({
    sht_id: {type: String, default: '', maxLength: 500, required: true},
    film_id: {type: String, default: '', maxLength: 500},
    room_id: {type: String, default: '', maxLength: 500},
    film_type: {type: String, default: '', maxLength: 500},
    sht_date: {type: String, default: Date.now},
    sht_time: {type: String, default: '', maxLength: 500},
    sht_end: {type: String, default: ''},
});

module.exports = mongoose.model('showtime', ShowTime, 'showtime');