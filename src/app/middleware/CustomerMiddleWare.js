const customerController = require("../controllers/CustomerController");

class CustomerMiddleWare{

    // [GET] /customer
    index(req, res, next){
        if(req.session.account){
            customerController.index(req, res, next);
        }else{
            res.redirect('/');
        } 
    }
}

module.exports = new CustomerMiddleWare;