const newsRouter = require("./news");
const siteRouter = require("./site");


function route(app){
    app.use("/", siteRouter);
    app.use("/news", newsRouter);

    // app.get("/", (req, res, next) => {
    
    //     return res.render("home");
    // });
    
    // app.get("/home", (req, res, next) => {
    //     return res.render("student");
    // })
}

module.exports = route;