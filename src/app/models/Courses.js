const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Courses = new Schema({
    name: {type: String, default: '', maxLength: 255},
    description: {type: String, default: '', maxLength: 600},
    Image: {type: String, default: '', maxLength: 255},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

// tự tạo model
module.exports = mongoose.model('Courses', Courses);