const Account = require("../models/Account");
const userRepository = require("./UserRepository");

class AccountRepository{
    async AUTO_ACC_ID() {
        const lastAccount = await Account.findOne().sort({ account_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastAccount) {
            const lastIdNumber = parseInt(lastAccount.account_id.replace('ACC', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `ACC${newIdNumber.toString().padStart(7, '0')}`;
    }

    async checkPassword(req, current_pass){
        var user_email = req.session.account;
        var user = await userRepository.findUserByEmail(user_email);
        return Account.findOne({account_id: user.account_id, deleted: false, account_password: current_pass})
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

module.exports = new AccountRepository;