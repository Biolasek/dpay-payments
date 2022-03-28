const axios = require('axios');
const sha256 = require('sha256');
class dpay {
    constructor(service, hash, production = true) {
        this.service = service;
        this.hash = hash;
        this.paymentUrl = production ? "https://secure.dpay.pl/register/":"https://secure-test.dpay.pl/register/";
        this.paymentInfoUrl = production ? "https://panel.dpay.pl/api/v1/pbl":"https://panel.digitalpayments.pl/api/v1/pbl";
    }

    async createPayment(value, url_success, url_fail, url_ipn, installment, creditcard, paysafecard, paypal, nobanks, channel, email, client_name, client_surname, accept_tos, description, custom, style) {
        const checksum = sha256(`${this.service}|${this.hash}|${value}|${url_success}|${url_fail}|${url_ipn}`);
        const query = JSON.stringify({ service: this.service, value, url_success, url_fail, url_ipn, checksum, installment, creditcard, paysafecard, paypal, nobanks, channel, email, client_name, client_surname, accept_tos, description, custom, style });
        try {
            const res = await axios.post(this.paymentUrl, query);
            return res.data;
        } catch (err) {
            return JSON.stringify({ status: false, error: true, msg: `${err.response.status} - ${err.response.statusText}` });
        }
    }

    async getPaymentInfo(transaction_id) {
        const checksum = sha256(`${this.service}|${transaction_id}|${this.hash}`);
        const query = { service: this.service, transaction_id, checksum };
        try {
            const res = await axios.post(`${this.paymentInfoUrl}/details`, query);
            return res.data;
        } catch (err) {
            console.log(err.response?.data.message);
        }
    }

    // Maybe one day...
    // async refundPayment(transaction_id) {
    //     const checksum = sha256(`${this.service}|${transaction_id}|${this.hash}`);
    //     const query = { service: this.service, transaction_id, checksum };
    //     try {
    //         const res = await axios.post(`${this.paymentInfoUrl}/refund`, query);
    //         console.log(res);
    //         return res.data;
    //     } catch (err) {
    //         console.log(err.response);
    //         console.log("error");
    //         console.log(checksum);
    //     }
    // }
}
module.exports = dpay;