const Product = require("../models/Product");
const Category = require("../models/Category");
const productRepository = require("../repository/ProductRepository");
const cloudinary = require("cloudinary");
const fs = require("fs");
const bwipjs = require("bwip-js");
const path = require('path');

class ProductService {
    
    async index(req, perPage = 10) {
        const page = parseInt(req.params["page"]) || 1;
        // const perPage = 10;
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Promise.all([
            Product.aggregate([
                {
                    $match: {
                        deleted: false 
                    }
                },
                {
                    $lookup: {
                        from: "category",
                        localField: "category_id",
                        foreignField: "category_id",
                        as: "category_db",
                    },
                },
                {
                    $unwind: "$category_db",
                },
            ])
                .skip((page - 1) * perPage)
                .limit(perPage),
            Category.find(),
        ])
            .then(([result, category]) => {
                if (result && category) {
                    return {
                        result,
                        page,
                        totalPages,
                        totalCount,
                        category,
                    };
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                return err;
            });
    }

    async add_product(req, formData) {
        var product_id = await productRepository.AUTO_PRO_ID();
        var name = formData.name;
        var import_price = formData.import_price;
        var retail_price = formData.retail_price;
        var category = formData.category;
        var quantity = formData.quantity;
        var description = formData.description;
        var img = await cloudinary.v2.uploader
            .upload(req.file.path, { folder: "POS" })
            .then((result) => {
                fs.unlinkSync(req.file.path);
                var url = result.url;
                var public_id = result.public_id;
                return {
                    url,
                    public_id
                };
            });

        var imgBarCodeSrc = await productRepository.generateLinkBarCodeImg(product_id)
        .then(result => {
            return result;
        }).catch(err => {
            return err;
        });

        var barcode = await cloudinary.v2.uploader
            .upload(imgBarCodeSrc, {folder: 'POS'})
            .then(result => {
                fs.unlinkSync(imgBarCodeSrc);
                var url = result.url;
                var public_id = result.public_id;
                return {
                    url, 
                    public_id
                };
            });

        
        var product = {
            'product_id': product_id,
            'product_name': name,
            'product_description': description,
            'quantity': quantity,
            'real_price': import_price,
            'retail_price': retail_price,
            'category_id': category,
            'product_image': img.url,
            'product_barcode': barcode.url,
            'barcode_public_id': barcode.public_id,
            'image_public_id': img.public_id
        };

        return Product.insertMany(product)
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async edit_product(req, formData){
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

        var imgSrc = '';
        var data = '';

        if(img != undefined){
            var data = await cloudinary.v2.uploader.upload(img.path, {folder: 'POS'})
            .then(async (result) => {
                await cloudinary.v2.uploader.destroy(public_id);
                var url = result.url;
                var new_public_id = result.public_id;
                return {
                    url,
                    new_public_id,
                }
            })
            .catch(err => err);

            imgSrc = data.url;
            public_id = data.new_public_id;
        } else{
            imgSrc = old_img;
        }

        var product = {
            'product_id': id,
            'product_name': name,
            'product_description': description,
            'quantity': quantity,
            'real_price': import_price,
            'retail_price': retail_price,
            'category_id': category,
            'product_image': imgSrc,
            'image_public_id': public_id,
            'updateAt': Date.now()
        }

        return Product.updateOne({product_id: id}, product)
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async delete_product(requestJson){
        var product_id = requestJson.product_id;
        return Product.deleteOne({product_id: product_id})
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async soft_delete_product(requestJson){
        var product_id = requestJson.product_id;
        return Product.updateOne({product_id: product_id}, {
            updateAt: Date.now(),
            deleted: true,
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }

    async filter_product(requestJson){
        var category_id = requestJson.category_id;
        return productRepository.findProductByCategoryId(category_id)
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new ProductService();
