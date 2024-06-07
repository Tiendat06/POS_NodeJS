const { multipleMongooseToObj } = require('../../utils/mongoose');
const productService = require('../services/ProductService');

class ProductController{

    // [GET] /product
    async index(req, res, next){
        return productService.index(req)
        .then(result => {
            if(result){
                const pagesArray = Array.from({ length: result.totalPages }, (_, i) => i + 1);

                res.render('product/product', {
                    productList: multipleMongooseToObj(result.result),
                    categoryList: multipleMongooseToObj(result.category),
                    currentPage: result.page,
                    totalPages: pagesArray
                });
            } else {
                throw new Error();
            }
        })
        .catch(err =>{
            console.log(err);
            res.render('error/error', {
                error: err,
            })
        })
    }

    // [POST, AJAX] /product/add
    async add_product(req, res, next, formData, responseData){
        return productService.add_product(req, formData)
        .then(result => {
            if(result.length > 0){
                return res.json(responseData.success);
            }else{
                throw new Error(responseData.fail)
            }
        })
        .catch(err => {
            console.log(err);
            return res.json(responseData.fail);
        })
    }

    // [PUT, AJAX] /product/edit
    async edit_product(req, res, next, formData, responseData){
        return productService.edit_product(req, formData)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.json(responseData.success);
            } else {
                throw new Error(responseData.noChange);
            }
        })
        .catch(err => {
            console.log(err);
            return res.json(responseData.fail);
        })
    }

    // [DELETE, AJAX] /product/delete
    delete_product(req, res, next, requestJson, responseData){
        productService.soft_delete_product(requestJson)
        .then(result => {
            if(result.modifiedCount > 0){
                return res.json(responseData.success);
            } else {
                throw new Error(responseData.fail);
            }
        })
        .catch(err => {
            console.log(err);
            res.json(responseData.fail);
        })
    }
}

module.exports = new ProductController;