# dpay-payments
Unofficial API for dpay polish payments.

### Installation
```
npm i dpay-payments
```

### Sample usage
*Creating payment*
```js
const dpay = require('dpay-payments');
const dpayObj = new dpay("Service name", "Secret hash"/*, production (default true)*/);
[...]
test();

async function test() {
    /* You can add more params if you want comparably to dpay docs : https://docs.dpay.pl/#operation/registerPayment ("Request samples") */
    const res = await dpayObj.createPayment("1.00", "https://github.com/Biolasek/success", "https://github.com/Biolasek/fail", "https://github.com/Biolasek/ipn");

    /**
     * Response on success:
     * { status: true, error: false, msg: 'here's the link to payment so you can easly grab this', transactionId: 'id of transaction' }
     *
     * More information here in "Response samples" : https://docs.dpay.pl/#operation/registerPayment
    */
    console.log(res);
}
```

*Get info about transaction*
```js
[...]
async function test() {
    [...]
    sthother(res.transactionId);
}
async function sthother(transaction_id) {
    const information = await dpayObj.getPaymentInfo(transaction_id);

    /**
     * Response on success:
     * { status: 'success' transaction: { some other informations including paid status }}
     * More information here in "Response samples" : https://docs.dpay.pl/#operation/transactionDetails
    */
    console.log(information);
}
```