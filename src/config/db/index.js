const mongoose = require("mongoose");
async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/POS')
            .then(() => console.log('Connected!'));
            // console.log("Connected !")
    } catch (error) {
        console.log("Error: ", error);
    }

}

module.exports = { connect };