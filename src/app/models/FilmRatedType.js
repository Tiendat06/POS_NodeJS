const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmRatedType = new Schema({
    film_rated_type_id: {type: String, default: '', maxLength: 500},
    film_rated_type_description: {type: String, default: '', maxLength: 500},
});