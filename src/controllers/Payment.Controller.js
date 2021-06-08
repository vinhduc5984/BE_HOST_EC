const controller = require('./index');
const PaymentService = require('../services/Payment.Service');
const queryString = require('query-string');

const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AbdMTIxQbfgKJ8j0HEJxqgPc3XDQS3LbNMJCcRhANmHFNHitF4MX2nJYzSnz5q8dKzoAq-QNV3kqHPmA',
  client_secret:
    'EGHwFRwPVejRoMdhLLOmyG2tznI1RLNjW7BZB4YgDKZna5f40kZ0TDOCtwu4m8fvpmuRfmVs_p1cqhxG',
});
const Payment = async (req, res, next) => {
  const transactions = req.body.price;
  console.log(transactions);
  const dollar = transactions / 23000;
  console.log(dollar);
  const dollar2f = parseFloat(dollar.toFixed(2));
  console.log(dollar2f);
  //const reqQuery=queryString.stringifyUrl({dollar2f})
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url:
        'http://localhost:3321/paypal_api/payment/paySuccess?dollar2f=' +
        dollar2f,
      cancel_url: 'http://localhost:3321/paypal_api/payment/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Red Sox Hat',
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
        description: 'Hat for the best team ever',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
          console.log(payment.links[i]);
        }
      }
    }
  });
};

const PaymentSuccess = async (req, res, next) => {
  console.log(req.query);
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const dollar2f = req.query.dollar2f;
  console.log(dollar2f);
  console.log('PayerID ' + payerId);
  console.log('PaymentId ' + paymentId);

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: `${dollar2f}`,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
      }
    },
  );
};
module.exports = { Payment, PaymentSuccess };
