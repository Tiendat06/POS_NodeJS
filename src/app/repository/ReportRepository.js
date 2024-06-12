const Order = require("../models/Order");
const OrderDetails = require("../models/OrderDetails");
const Payment = require("../models/Payment");

class ReportRepository{

    async findOrderAndOrderDetailsAndPayment(req){
        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await Order.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Order.aggregate([
            {
                $lookup: {
                    from: 'customer',
                    localField: 'customer_id',
                    foreignField: 'customer_id',
                    as: 'customer_db',
                }
            }, {
                $unwind: '$customer_db',
            },             
            {
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_db',
                }
            }, {
                $unwind: '$user_db',
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
                    order: { $first: '$$ROOT' },
                    total_quantity: { $first: '$total_quantity' },
                    user_db: { $push: '$user_db' },
                    customer_db: { $push: '$customer_db' },
                    payment_db: { $push: '$payment_db' },
                    customer_given: { $first: '$customer_given' },
                    total_amount: {$first: '$total_amount'} ,
                    change_given: {$first: '$change_given'},
                }
            },  {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$order', { 
                            // order_details_db: '$order_details_db', 
                            // payment_db: '$payment_db',
                            // user_db: '$user_db',
                            // customer_db: '$customer_db',
                        }]
                    }
                }
            }
        ])
        .sort({date_created: 1})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(result => {
            return {
                result,
                page,
                totalPages,
                totalCount
            };
        })
        .catch(error => {
            return error;
        })
    }

    async getPaymentInfos(){
        return Promise.all([
            Order.countDocuments(),
            OrderDetails.aggregate([
                {
                    $group: {
                        _id: "$order_id", // Nhóm các bản ghi theo order_id
                        totalQuantity: { $sum: "$quantity" } // Tính tổng số lượng sản phẩm cho mỗi order_id
                    }
                }
            ]),
            Payment.aggregate([
                {
                    $addFields: {
                        total_amount: { $sum: "$total_amount" }
                    }
                }
            ]),
            OrderDetails.aggregate([
                {
                    $lookup: {
                        from: 'product',
                        localField: 'product_id',
                        foreignField: 'product_id',
                        as: 'product_db'
                    }
                }, {
                    $unwind: '$product_db'
                }, {
                    $match: {
                        'product_db.deleted': false
                    }
                }, {
                    $addFields: {
                        totalAmount: {
                            $sum: { $multiply: ["$quantity", "$product_db.retail_price"] }
                        }
                    }
                }, {
                    $addFields: {
                        totalAmountImport: {
                            $sum: { $multiply: ["$quantity", "$product_db.real_price"] }
                        }
                    }
                }
            ])
        ])
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

    async filterOrderAndOrderDetailsAndPaymentByDate(req, dateFrom, dateTo){
        // console.log(dateFrom);
        // console.log(dateTo);
        const startDate = new Date(dateFrom);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);

        // console.log("startDate:", startDate);
        // console.log("endDate:", endDate);

        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await Order.countDocuments({
            date_created: {
                $gte: startDate,
                $lte: endDate
            }
        });
        const totalPages = Math.ceil(totalCount / perPage);

        return Order.aggregate([
            {
                $match: {
                    date_created: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $lookup: {
                    from: 'customer',
                    localField: 'customer_id',
                    foreignField: 'customer_id',
                    as: 'customer_db',
                }
            }, {
                $unwind: '$customer_db',
            },             
            {
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user_db',
                }
            }, {
                $unwind: '$user_db',
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
                    order: { $first: '$$ROOT' },
                    total_quantity: { $first: '$total_quantity' },
                    user_db: { $push: '$user_db' },
                    customer_db: { $push: '$customer_db' },
                    payment_db: { $push: '$payment_db' },
                    customer_given: { $first: '$customer_given' },
                    total_amount: {$first: '$total_amount'} ,
                    change_given: {$first: '$change_given'},
                }
            },  {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$order', { 
                        }]
                    }
                }
            }
        ])
        .sort({date_created: 1})
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(result => {
            return {
                result,
                page,
                totalPages,
                totalCount
            };
        })
        .catch(error => {
            return error;
        })
    }

    async getPaymentInfosByDate(req, dateFrom, dateTo){
        console.log("From: ",dateFrom);
        console.log("To:",dateTo);
        const startDate = new Date(dateFrom);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);


        return Promise.all([
            Order.countDocuments({
                date_created: {
                    $gte: startDate,
                    $lte: endDate  
                }
            }),
            OrderDetails.aggregate([
                {
                    $lookup: {
                        from: 'order',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'order_db',
                    }
                }, {
                    $unwind: '$order_db'
                },{
                    $match: {
                        'order_db.date_created': {
                            $gte: startDate,
                            $lte: endDate  
                        }
                    }
                },
                {
                    $group: {
                        _id: "$order_id", // Nhóm các bản ghi theo order_id
                        totalQuantity: { $sum: "$quantity" } // Tính tổng số lượng sản phẩm cho mỗi order_id
                    }
                }
            ]),
            Payment.aggregate([
                {
                    $lookup: {
                        from: 'order',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'order_db',
                    }
                }, {
                    $unwind: '$order_db'
                }, {
                    $match: {
                        'order_db.date_created': {
                            $gte: startDate,
                            $lte: endDate  
                        }
                    }
                },
                {
                    $addFields: {
                        total_amount: { $sum: "$total_amount" }
                    }
                }
            ]),
            OrderDetails.aggregate([
                {
                    $lookup: {
                        from: 'order',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'order_db',
                    }
                }, {
                    $unwind: '$order_db'
                }, {
                    $match: {
                        'order_db.date_created': {
                            $gte: startDate,
                            $lte: endDate  
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'product',
                        localField: 'product_id',
                        foreignField: 'product_id',
                        as: 'product_db'
                    }
                }, {
                    $unwind: '$product_db'
                }, {
                    $match: {
                        'product_db.deleted': false
                    }
                }, {
                    $addFields: {
                        totalAmount: {
                            $sum: { $multiply: ["$quantity", "$product_db.retail_price"] }
                        }
                    }
                }, {
                    $addFields: {
                        totalAmountImport: {
                            $sum: { $multiply: ["$quantity", "$product_db.real_price"] }
                        }
                    }
                }
            ])
        ])
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
    }

}

module.exports = new ReportRepository;