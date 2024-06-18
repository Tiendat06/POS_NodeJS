const voucherRepository = require('../repository/VoucherRepository');
const customerRepository = require('../repository/CustomerRepository');

class VoucherService {

    async findAllVoucher(){
        return voucherRepository.findAllVoucher()
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    async findVoucherById(voucher_id){
        return voucherRepository.findVoucherById(voucher_id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    async countCustomerPoint(requestJson){
        var customer_phone = requestJson.customer_phone;
        var customer = await customerRepository.findCustomerByPhoneNumber(customer_phone);
        var customer_id = customer.customer_id;
        return voucherRepository.countCustomerPoint(customer_id)
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }


}

module.exports = new VoucherService;