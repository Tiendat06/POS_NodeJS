const Courses = require("../models/Courses");
const Customer = require("../models/Customer");
const Account = require("../models/Account");

class NewsController{

    // [GET] news
    index(req, res, next){
        Courses.find({})
        .then((result) => {
            res.render('news', {result: result});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // [GET] /:slug
    show(req, res, next){
        res.send("DETAIL PAGE");
    }
}

module.exports = new NewsController;