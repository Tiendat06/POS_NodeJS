const Voucher = require('../models/Voucher');
const CustomerVoucher = require('../models/CustomerVoucher');
const Customer = require('../models/Customer');
const User = require("../models/User");

class VoucherRepository{

    async AUTO_CSV_ID(){
        const lastCSV = await CustomerVoucher.findOne().sort({ customer_voucher_id: -1 }).exec();
        let newIdNumber = 1;
        if (lastCSV) {
            const lastIdNumber = parseInt(lastCSV.customer_voucher_id.replace('CSV', ''), 10);
            newIdNumber = lastIdNumber + 1;
        }
        return `CSV${newIdNumber.toString().padStart(7, '0')}`;
    }

    async findAllVoucher(){
        return Voucher.find()
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    async findVoucherById(id){
        return Voucher.findOne({voucher_id: id})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    async countCustomerPoint(customer_id){
        return Customer.findOne({customer_id: customer_id})
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }

    async updateCustomerVoucher(customer_voucher_id, customer_id, voucher_id){
        return CustomerVoucher.insertMany({
            customer_voucher_id: customer_voucher_id,
            customer_id: customer_id,
            voucher_id: voucher_id,
            date_used: Date.now()
        })
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            })
    }
}

module.exports = new VoucherRepository;