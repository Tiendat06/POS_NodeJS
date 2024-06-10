const OrderDetails = require("../models/OrderDetails");

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
}

module.exports = new OrderDetailsRepository;