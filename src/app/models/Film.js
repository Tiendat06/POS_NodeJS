const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Film = new Schema({
    film_id: {type: String, require, maxLength: 500},
    film_name: {type: String, default: '', maxLength: 500},
    film_director: {type: String, default: '', maxLength: 500},
    film_cast: {type: String, default: '', maxLength: 500},
    film_gerne: {type: String, default: '', maxLength: 500},
    film_type: {type: String, default: '', maxLength: 500},
    film_running_time: {type: String, default: '0 minutes', maxLength: 500},
    film_release_date: {type: String, default: '', maxLength: 500},
    film_description: {type: String, default: '', maxLength: 500},
    film_language: {type: String, default: '', maxLength: 500},
    film_rated: {type: String, default: 'P', maxLength: 500},
    film_photo: {type: String, default: '', maxLength: 500},
    film_trailer: {type: String, default: '', maxLength: 500},
    film_slider: {type: String, default: '', maxLength: 500},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('film', Film, 'film');