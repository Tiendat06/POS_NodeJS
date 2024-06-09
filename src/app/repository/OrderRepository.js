const Order = require("../models/Order");

class OrderRepository {
    async AUTO_ORD_ID() {
        const lastUser = await Order.findOne().sort({ order_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastUser) {
            const lastIdNumber = parseInt(lastUser.order_id.replace("ORD", ""), 10);
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
}

module.exports = new OrderRepository;