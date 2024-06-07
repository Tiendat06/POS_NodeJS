const Customer = require("../models/Customer");

class CustomerService{

    async index(req){
        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await Customer.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Customer.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .then(result => {
            return {
                result,
                page,
                totalPages,
                totalCount
            };
        }).catch(err => {
            return err;
        })
    }
}

module.exports = new CustomerService;