const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmChoice = new Schema({
    film_id: {type: String, default: '', maxLength: 500},
    film_type: {type: String, default: '', maxLength: 500},
});

module.exports = mongoose.model('film_choice', FilmChoice, 'film_choice');