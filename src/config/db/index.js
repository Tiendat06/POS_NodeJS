const mongoose = require("mongoose");
async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/node_test')
            .then(() => console.log('Connected!'));
            console.log("Connected !")
    } catch (error) {
        console.log("Error");
    }

}

module.exports = { connect };