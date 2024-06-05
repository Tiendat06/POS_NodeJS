const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowTimeSeat = new Schema({
    sht_id: {type: String, default: '', maxLength: 500},
    sht_seat_id: {type: String, default: '', maxLength: 500},
    sht_isBook: {type: String, default: null, maxLength: 500},
});

module.exports = mongoose.model('sht_seat', ShowTimeSeat, 'sht_seat');