const Product = require('../models/Product');
const fs = require("fs");
const bwipjs = require("bwip-js");
const path = require('path');

class ProductRepository{

    async AUTO_PRO_ID(){
        const lastUser = await Product.findOne().sort({ product_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastUser) {
            const lastIdNumber = parseInt(lastUser.product_id.replace('PRO', ''), 10);
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

}

module.exports = new ProductRepository;