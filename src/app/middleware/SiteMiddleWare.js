const siteController = require("../controllers/SiteController");

class SiteMiddleWare{

    // [GET] /
    index(req, res, next){
        if (req.session.account) {
            siteController.index(req, res, next);
        } else{
            res.redirect('log/login');
        }
    }

    // [POST] /home/order
    home_order(req, res, next){
        var formData = req.body;
        var product_id = formData['product_id_choose-quan'];
        var quantity = formData['chooseQuantityBackdrop'];

        if(product_id == undefined || product_id == '' ||
            quantity == undefined || quantity == ''
        ){
            res.redirect('/');
        } else {
            siteController.home_order(req, res, next, formData);
        }
    }

    // [POST] /home/delete_order
    home_delete_order(req, res, next){
        var formData = req.body;
        var order_list_id = formData['order_list_id_delete'];

        if(order_list_id == undefined || order_list_id == ''){
            res.redirect('/');
        } else{
            siteController.home_delete_order(req, res, next, formData);
        }
    }
}

module.exports = new SiteMiddleWare;