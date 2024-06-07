const productController = require("../controllers/ProductController");

class ProductMiddleWare{

    // [GET] /product
    index(req, res, next){
        if(req.session.account){
            productController.index(req, res, next);
        }else{
            res.redirect("/");
        }
    }

    // [POST, AJAX] /product/add
    add_product(req, res, next){
        var formData = req.body;
        var responseData = {
            'success': 'Add Successfully',
            'fail': 'Add failed',
            'empty': 'Please fill in all fields',
            'email': 'Email has been contained'
        }

        var name = formData.name;
        var import_price = formData.import_price;
        var retail_price = formData.retail_price;
        var category = formData.category;
        var quantity = formData.quantity;
        var description = formData.description;
        var img = req.file;

        if(name == undefined || name == '' ||
            import_price == undefined || import_price == '' ||
            retail_price == undefined || retail_price == '' ||
            category == undefined || category == '' ||
            quantity == undefined || quantity == '' ||
            description == undefined || description == '' ||
            img == undefined
        ){
            res.json(responseData.empty);
        } else {
            productController.add_product(req, res, next, formData, responseData);
        }
    }

    // [PUT, AJAX] /product/edit
    edit_product(req, res, next){
        var formData = req.body;
        var responseData = {
            'success': 'Edit Successfully',
            'fail': 'Edit failed',
            'empty': 'Please fill in all fields',
            'noChange': 'There are no changes',
            'email': 'Email has been contained'
        }

        var id = formData.id;
        var old_img = formData.old_img;
        var public_id = formData.public_id;
        var name = formData.name;
        var import_price = formData.import_price;
        var retail_price = formData.retail_price;
        var category = formData.category;
        var quantity = formData.quantity;
        var description = formData.description;
        var img = req.file;

        if(id == undefined || id == '' ||
            old_img == undefined || old_img == '' ||
            name == undefined || name == '' ||
            import_price == undefined || import_price == '' ||
            retail_price == undefined || retail_price == '' ||
            category == undefined || category == '' ||
            quantity == undefined || quantity == '' ||
            description == undefined || description == '' ||
            public_id == undefined || public_id == ''
        ){
            res.json(responseData.empty);
        } else {
            productController.edit_product(req, res, next, formData, responseData);
        }
    }

    // [DELETE, AJAX] /product/edit
    delete_product(req, res, next){
        var responseData = {
            'success': 'Delete Successfully',
            'fail': 'Delete failed',
            'empty': 'Please fill in all fields',
            'noChange': 'There are no changes',
            'email': 'Email has been contained'
        }
        var requestJson = req.body;
        var product_id = requestJson.product_id;

        if(product_id == '' || product_id == undefined){
            res.json(responseData.empty);
        }else{
            productController.delete_product(req, res, next, requestJson, responseData);
        }
    }
}

module.exports = new ProductMiddleWare;