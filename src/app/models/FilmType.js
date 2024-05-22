const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmType = new Schema({
    film_type_id: {type: String, default: '', maxLength: 500},
    film_type_name: {type: String, default: '', maxLength: 500},
    film_type_price: {type: Number, default: 0, maxLength: 10},
});

module.exports = mongoose.model('film_type', FilmType, 'film_type');