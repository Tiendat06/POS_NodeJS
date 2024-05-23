const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    ticket_id: {type: String, default: '', maxLength: 500},
    account_id: {type: String, default: '', maxLength: 500},
    cluster_id: {type: String, default: '', maxLength: 500},
    film_id: {type: String, default: '', maxLength: 500},
    film_type: {type: String, default: '', maxLength: 500},
    sht_id: {type: String, default: '', maxLength: 500},
    seat_id: {type: String, default: '', maxLength: 500},
    room_id: {type: String, default: '', maxLength: 500},
    voucher_id: {type: String, default: '', maxLength: 500},
    ticket_price: {type: Number, default: 0, maxLength: 10},
    ticket_date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('ticket', Ticket, 'ticket');