const Account = require('../models/Account');
const Role = require('../models/Role');
const User = require('../models/User');

class AccountService{

    // [GET] /account
    async index(req){
        const page = parseInt(req.params['page']) || 1;
        const perPage = 10;
        const totalCount = await Account.countDocuments();
        const totalPages = Math.ceil(totalCount / perPage);

        return Account.aggregate([
            {
                $match: {
                    deleted: false 
                }
            },
            {
                $lookup: {
                    from: 'role',
                    localField: 'role_id',
                    foreignField: 'role_id',
                    as: 'role_db'
                }
            }, {
                $unwind: '$role_db'
            }, {
                $lookup: {
                    from: 'user',
                    localField: 'account_id',
                    foreignField: 'account_id',
                    as: 'user_db'
                }
            } , {
                $unwind: '$user_db'
            }
        ])
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

    // [GET] /account/change_role/:role_id
    async changeRole(req){
        var account_id = req.params['account_id'];
        var role_id = req.params['role_id'];
        return Account.updateOne({account_id: account_id}, {
            role_id: role_id,
        }).then(result => {
            return result;
        }).catch(err => {
            return err;
        })
    }

    // [PUT] /account/reset_password
    async reset_password(requestJson){
        var account_id = requestJson.account_id;
        var user_email = requestJson.user_email;

        return Account.updateOne({account_id: account_id}, {
            account_password: user_email,
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })

    }
}

module.exports = new AccountService;