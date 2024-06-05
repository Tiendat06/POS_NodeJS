const newsRouter = require("./news");
const siteRouter = require("./site");
const userRouter = require("./user");
const errorRouter = require("./error");
const logRouter = require("./log");
const accountRouter = require("./account");


function route(app){
    app.use("/", siteRouter);
    app.use("/user", userRouter);
    app.use("/account", accountRouter);
    app.use("/news", newsRouter);
    app.use("/log", logRouter);
    app.use(errorRouter);

    // app.get("/", (req, res, next) => {
    
    //     return res.render("home");
    // });
    
    // app.get("/home", (req, res, next) => {
    //     return res.render("student");
    // })
}

module.exports = route;