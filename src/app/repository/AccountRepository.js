const Account = require("../models/Account");

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
}

module.exports = new AccountRepository;