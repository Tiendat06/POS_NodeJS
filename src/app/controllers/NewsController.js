// const Courses = require("../models/Courses");
// const Customer = require("../models/Customer");
// const Account = require("../models/Account");

// const NewsDAO = require("../DAO/NewsDAO");

class NewsController{

    // [GET] news
    async index(req, res, next){
        // await NewsDAO.AUTO_ID_SHT();
        // Courses.find({})
        // .then((result) => {
        //     res.render('news', {result: result});
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    // [GET] /:slug
    show(req, res, next){
        res.send("DETAIL PAGE");
    }
}

module.exports = new NewsController;