const User = require("../models/User");

class UserRepository{

    async AUTO_USE_ID() {
        const lastUser = await User.findOne().sort({ user_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastUser) {
            const lastIdNumber = parseInt(lastUser.user_id.replace('USE', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `USE${newIdNumber.toString().padStart(7, '0')}`;
    }

    async checkEmail(email){
        return User.findOne({user_email: email, deleted: false})
        .then(result => {
            if(result){
                return true;
            } else{
                return false;
            }
        })
        .catch(err => {
            return false;
        })
    }
}

module.exports = new UserRepository;