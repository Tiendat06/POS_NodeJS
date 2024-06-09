const orderRepository = require("../repository/OrderRepository");
const userRepository = require("../repository/UserRepository");
const orderDetailsRepository = require('../repository/OrderDetailsRepository');
const productRepository = require('../repository/ProductRepository');
const Order = require("../models/Order");
const OrderDetails = require("../models/OrderDetails");

class OrderService{

    async get_order_in_home(req){
        var user_email = req.session.account;
        var user = await userRepository.findUserByEmail(user_email);
        var user_id = user.user_id;

        return OrderDetails.aggregate([
            {
                $lookup:{
                    from: 'order',
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'order_db',
                }
            }, {
                $unwind: '$order_db',
            }, {
                $match: {
                    'order_db.user_id': user_id,
                    'order_db.date_created': null,
                }
            }, 
            {
                $lookup: {
                    from: 'product',
                    localField: 'product_id',
                    foreignField: 'product_id',
                    as: 'product_db',
                }
            }, {
                $unwind: '$product_db',
            }, {
                $addFields: {
                    total_price: { $multiply: ['$quantity', '$product_db.retail_price'] }
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

    async home_order(req, formData){
        var user_email = req.session.account;
        var user = await userRepository.findUserByEmail(user_email);
        var user_id = user.user_id;
        var product_id = formData['product_id_choose-quan'];
        var quantity = formData['chooseQuantityBackdrop'];

        var order_id = '';
        var order_list_id = await orderDetailsRepository.AUTO_ODT_ID();
        var product = await productRepository.findProductByProductId(product_id);
        var quantityOfProduct = product.quantity;
        var newQuantity = quantityOfProduct - parseInt(quantity, 10);
        await productRepository.updateProductQuantityByProductId(product_id, newQuantity);

        if(await orderRepository.checkIsOrdering(user_id)){
            var order = await orderRepository.findOrderByUserIdAndDateCreated(user_id);
            order_id = order.order_id;
            if(await orderDetailsRepository.checkProductIsInOrderDetails(order_id, product_id)){
                var order_details = await orderDetailsRepository.getOrderDetailsByOrderIdAndProductId(order_id, product_id);
                order_list_id = order_details.order_list_id;
                var quantityOfOrderDetails = order_details.quantity;
                var newQuantityOfOrderDetails = parseInt(quantityOfOrderDetails, 10) + parseInt(quantity, 10);
                await orderDetailsRepository.updateQuantityOrderDetailsByOrderDetailsId(order_list_id, newQuantityOfOrderDetails);
            } else {
                await orderDetailsRepository.insertOrderDetails(order_list_id, order_id, product_id, quantity);
            }
        } else{
            order_id = await orderRepository.AUTO_ORD_ID();
            await orderRepository.insertOrder(order_id, user_id);
            await orderDetailsRepository.insertOrderDetails(order_list_id, order_id, product_id, quantity);
        }
        req.session.order_id = order_id;
    }

    async home_delete_order(formData){
        var order_list_id = formData['order_list_id_delete'];
        var order_details = await orderDetailsRepository.getOrderDetailsByOrderDetailsId(order_list_id);
        var order_id = order_details.order_id;
        var quantityInOrderDetails = order_details.quantity;
        var product_id = order_details.product_id;

        return OrderDetails.deleteOne({order_list_id: order_list_id})
        .then(async (result) => {
            if(result.deletedCount == 1){
                var product = await productRepository.findProductByProductId(product_id);
                var newQuantityInProduct = quantityInOrderDetails + product.quantity;
                await productRepository.updateProductQuantityByProductId(product_id, newQuantityInProduct);

                if(!await orderDetailsRepository.checkOrderIdInOrderDetails(order_id)){
                    await orderRepository.deleteOrderByOrderId(order_id);
                    delete req.session.order_id;
                }
                return true;
            }
            return false;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    }
}

module.exports = new OrderService;