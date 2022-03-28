const axios = require('axios');
const sha256 = require('sha256');
class dpay {
    constructor(service, hash, production = true) {
        this.service = service;
        this.hash = hash;
        this.url = production ? "https://secure.dpay.pl/register":"https://secure-test.dpay.pl/register";
    }

    async createPayment(value, url_success, url_fail, url_ipn, installment = true, creditcard = true, paysafecard = true, paypal = true, nobanks = false, channel = "", email = "", client_name = "", client_surname = "", accept_tos = 1, description = "Example description 123", custom = "your custom data", style = "default") {
        const checksum = sha256(`${this.service}|${this.hash}|${value}|${url_success}|${url_fail}|${url_ipn}`);
        const query = JSON.stringify({ service: this.service, value, url_success, url_fail, url_ipn, checksum/*, installment, creditcard, paysafecard, paypal, nobanks, channel, email, client_name, client_surname, accept_tos, description, custom, style*/ });
        try {
            const res = await axios.post(this.url, query);
            console.log(res);
            console.log(`${this.service}|${this.hash}|${value}|${url_success}|${url_fail}|${url_ipn}`);
            console.log(query);
            return res.data;
        } catch (err) {
            return JSON.stringify({ status: false, error: true, msg: `${err.response.status} - ${err.response.statusText}` });
        }
    }
}
module.exports = dpay;