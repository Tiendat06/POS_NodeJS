const OrderDetails = require("../models/OrderDetails");
const Product = require('../models/Product');

class OrderDetailsRepository{

    async AUTO_ODT_ID(){
        const lastOrderDetail = await OrderDetails.findOne().sort({ order_list_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastOrderDetail) {
            const lastIdNumber = parseInt(lastOrderDetail.order_list_id.replace('ODT', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `ODT${newIdNumber.toString().padStart(7, '0')}`;
    }

    async checkProductIsInOrderDetails(order_id, product_id){
        const order_details = await OrderDetails.findOne({order_id: order_id, product_id: product_id})
        if(order_details){
            return true;
        }
        return false;
    }

    async getOrderDetailsByOrderIdAndProductId(order_id, product_id){
        return OrderDetails.findOne({order_id: order_id, product_id: product_id})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async updateQuantityOrderDetailsByOrderDetailsId(order_list_id, quantity){
        return OrderDetails.updateOne({order_list_id: order_list_id}, {
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

    async insertOrderDetails(order_list_id, order_id, product_id, quantity){
        var order_details = {
            'order_list_id': order_list_id,
            'order_id': order_id,
            'product_id': product_id,
            'quantity': quantity
        }
        return OrderDetails.insertMany(order_details)
        .then(result => {
            if(result.length > 0){
                return result;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async getOrderDetailsByOrderDetailsId(order_list_id){
        return OrderDetails.findOne({order_list_id: order_list_id})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async checkOrderIdInOrderDetails(order_id){
        return OrderDetails.findOne({order_id: order_id})
        .then(result => {
            if(result){
                return true;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async findOrderAndOrderDetailsByCustomerId(customer_id){
        return OrderDetails.aggregate([
            {
                $lookup: {
                    from: 'order',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'order_db',
                }
            }, {
                $unwind: '$order_db',
            }, {
                $match: {
                    'order_db.customer_id': customer_id
                }
            }, 
            {
                $lookup: {
                    from: 'payment',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'payment_db',
                }
            }, {
                $unwind: '$payment_db'
            }, {
                $addFields: {
                    customer_given: { $sum: ['$payment_db.total_amount', '$payment_db.change_given'] }
                }
            }, {
                $addFields: {
                    total_amount: '$payment_db.total_amount' 
                }
            }, {
                $addFields: {
                    change_given: '$payment_db.change_given'
                }
            }, 
            {
                $group: {
                    _id: '$order_id',
                    order_details: { $first: '$$ROOT' },
                    total_quantity: { $sum: '$quantity' },
                    order_db: { $push: '$order_db' },
                    payment_db: { $push: '$payment_db' },
                    customer_given: { $first: '$customer_given' },
                    total_amount: {$first: '$total_amount'} ,
                    change_given: {$first: '$change_given'},
                }
            },  {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$order_details', { order_db: '$order_db', payment_db: '$payment_db' }]
                    }
                }
            }
        ])
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async findOrderDetailsAndProductByOrderId(order_id){
        return Product.aggregate([{
                $lookup: {
                    from: 'order_details',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'order_details_db'
                }
            }, {
                $unwind: '$order_details_db'
            }, {
                $match: {
                    'order_details_db.order_id': order_id
                }
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'category_id',
                    foreignField: 'category_id',
                    as: 'category_db'
                }
            }, {
                $unwind: '$category_db'
            }, {
                $addFields: {
                    total_amount: { $multiply: ['$order_details_db.quantity', '$retail_price'] }
                }
            }
        ])
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new OrderDetailsRepository;