module.exports = {
    // list
    multipleMongooseToObj: function (mongoosesArrays) {
        return mongoosesArrays.map((mongoosesArrays) =>
            mongoosesArrays.toObject(),
        );
    },

    // only 1
    mongooseToObj: function (mongooseOne) {
        return mongooseOne ? mongooseOne.toObject() : mongooseOne;
    },
}