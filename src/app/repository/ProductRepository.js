const Product = require('../models/Product');
const fs = require("fs");
const bwipjs = require("bwip-js");
const path = require('path');
const Category = require('../models/Category');

class ProductRepository{

    async AUTO_PRO_ID(){
        const lastProduct = await Product.findOne().sort({ product_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastProduct) {
            const lastIdNumber = parseInt(lastProduct.product_id.replace('PRO', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `PRO${newIdNumber.toString().padStart(7, '0')}`;
    }

    generateLinkBarCodeImg(text){
        return new Promise((resolve, reject) => {
            bwipjs.toBuffer(
                {
                    bcid: "code128", // Loại mã vạch (code128 là loại phổ biến)
                    text: text, // Dữ liệu mã vạch
                    scale: 3, // Tỉ lệ (mặc định là 2)
                    height: 10, // Chiều cao mã vạch
                    includetext: true, // Bao gồm văn bản bên dưới mã vạch
                    textxalign: "center", // Căn giữa văn bản
                },
                function (err, png) {
                    if (err) {
                        console.error("Error generating barcode:", err);
                        reject(err);
                    } else {
                        fs.writeFile("src/public/img/barcode.png", png, function (err) {
                            if (err) {
                                console.error("Error saving barcode image:", err);
                                reject(err);
                            } else {
                                resolve(path.join('src', 'public', 'img', 'barcode.png'));
                            }
                        });
                    }
                }
            );
        })
    }

    async findProductByProductId(product_id){
        return Product.findOne({product_id: product_id, deleted: false})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async updateProductQuantityByProductId(product_id, quantity){
        return Product.updateOne({product_id: product_id}, {
            quantity: quantity
        })
        .then(result => {
            if(result.modifiedCount > 0){
                return true;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async findProductByCategoryId(category_id){
        return Product.find({category_id: category_id, deleted: false})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async searchProductByRegex(req, search_name){
        const regex = new RegExp(search_name, 'i');
        const page = parseInt(req.params["page"]) || 1;
        const perPage = 6;
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Promise.all([
            Product.aggregate([
                {
                    $match: {
                        deleted: false,
                        product_name: {
                            $regex: regex
                        }
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

}

module.exports = new ProductRepository;