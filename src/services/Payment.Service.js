// sử dụng paypal sanbox để thanh toán

const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const PaymentPaypal = (body) => {
  try {
    let { Cost } = '25.00';
    console.log(Cost);
    const Tien = +Cost;
    const Dollar = Cost / 23000;
    const dollar2f = parseFloat(Dollar.toFixed(2));
    const create_payment_json = JSON.stringify({
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3321/paypal_api/payment/paySuccess',
        cancel_url: 'http://localhost:3321/paypal_api/payment/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'Phí vận chuyển',
                sku: '001',
                price: `${dollar2f}`,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: `${dollar2f}`,
          },
          description: 'Phí vận chuyển',
        },
      ],
    });

    paypal.payment.create(create_payment_json, function (error, payment) {
      console.log('before if');
      if (error) {
        //throw error;
        console.log('in if');
        return {
          msg: 'Payment fail',
          statusCode: 300,
        };
      } else {
        console.log('AAAAA');
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
            console.log(payment.links[i]);
          }
        }
        return {
          msg: 'Payment Success1',
          statusCode: 200,
        };
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const SuccessPayment = (body) => {
  const payerId = body.PayerID || '3ETG5LKVN3JV2';
  const paymentId = body.paymentId || '150507920';
  const totalPrice = body.price || '55.520';

  console.log(totalPrice);
  const execute_payment_json = JSON.stringify({
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: `${totalPrice}`,
        },
      },
    ],
  });
  console.log(execute_payment_json);
  console.log('execute_payment');
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      console.log('In execute_payment');
      if (error) {
        console.log(error.response);
        // throw error;
        return {
          msg: 'Payment Fail',
          statusCode: 300,
        };
      } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
        return {
          msg: 'Payment Success',
          statusCode: 200,
        };
      }
    },
  );
  console.log('after execute_payment');
};

module.exports = { PaymentPaypal, SuccessPayment };
