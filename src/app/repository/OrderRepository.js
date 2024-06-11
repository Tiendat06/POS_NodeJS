const Order = require("../models/Order");
const OrderDetails = require("../models/OrderDetails");

class OrderRepository {
    async AUTO_ORD_ID() {
        const lastOrder = await Order.findOne().sort({ order_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastOrder) {
            const lastIdNumber = parseInt(lastOrder.order_id.replace("ORD", ""), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `ORD${newIdNumber.toString().padStart(7, "0")}`;
    }

    async checkIsOrdering(user_id){
        // find max order id with date created is null
        // .sort({ order_id: -1 }).exec()
        const maxOrder = await Order.findOne({date_created: null, user_id: user_id});
        if(maxOrder){
            return true;
        }
        return false;
    }

    async findOrderByUserIdAndDateCreated(user_id){
        // find max order id with date created is null
        return Order.findOne({date_created: null, user_id: user_id})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async insertOrder(order_id, user_id){
        var order = {
            'order_id': order_id,
            'user_id': user_id,
            'date_created': null
        }
        return Order.insertMany(order)
        .then(result => {
            if(result.length > 0){
                return true;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async deleteOrderByOrderId(order_id){
        return Order.deleteOne({order_id: order_id})
        .then(result => {
            if(result.deletedCount == 1){
                return true;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }

    async calculateTotalBillByOrderId(order_id){
        return OrderDetails.aggregate([
            {
                $match: {
                    'order_id': order_id
                }
            }, {
                $lookup: {
                    from: 'product',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'product_db',
                }
            }, {
                $unwind: '$product_db'
            }, {
                $group: {
                    _id: '$order_id',
                    totalAmount: {
                        $sum: { $multiply: ["$quantity", "$product_db.retail_price"] }
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

    async findOrderByOrderId(order_id){
        return Order.findOne({order_id: order_id})
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async updateOrderWhilePaySuccess(order_id, customer_id){
        return Order.updateOne({order_id: order_id}, {
            customer_id: customer_id,
            date_created: Date.now(),
        })
    }

    async findOrderAndOrderDetailsByCustomerId(customer_id){
        return Order.aggregate([
            {
                $match: {
                    'customer_id': customer_id
                }
            }, {
                $lookup: {
                    from: 'order_details',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'order_details_db',
                }
            }, {
                $unwind: '$order_details_db',
            }, {
                $addFields: {
                    total_quantity: { $sum: '$order_details_db.quantity' }
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
            }, 
        ])
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }
}

module.exports = new OrderRepository;