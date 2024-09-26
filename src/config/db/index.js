const mongoose = require("mongoose");
async function connect(){

    try {
        // mongodb+srv://tadat290903:Khinaobacanli290903@mongoonlinecluster.ghvpe.mongodb.net/
        // mongodb://localhost:27017/
        await mongoose.connect('mongodb://mongodb:27017/POS')
            .then(() => console.log('Connected!'));
            // console.log("Connected !")
    } catch (error) {
        console.log("Error: ", error);
    }

}

module.exports = { connect };