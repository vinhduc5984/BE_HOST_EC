const controller = require('./index');
const PaymentService = require('../services/Payment.Service');
const queryString = require('query-string');

const paypal = require('paypal-rest-sdk');
const Bill = require('../models/bill.Model');
const JWT = require('../services/jwt.Service');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});
const Payment = async (req, res, next) => {
  const transactions = req.body.price;
  //const tokenID = req.body.Token;
  console.log(transactions);
  const dollar = transactions / 23000;
  console.log(dollar);
  const dollar2f = parseFloat(dollar.toFixed(2));
  console.log(dollar2f);
  var today = new Date();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var day =
    today.getDate() +
    '/' +
    (today.getMonth() + 1) +
    '/' +
    today.getFullYear() +
    ' - ';

  //tokenID = tokenID.trim();
  //console.log("TokenID verify: "+ tokenID );

  /*const TokenID = req.body.TokenID;     
      const  id1 = JWT.verify(TokenID); // ID người gửi 
      console.log("Verify token"+id1);*/
  const id = 13;
  const senderName = req.body.SenderName;
  const senderPhone = req.body.SenderPhone;
  const senderAddress = req.body.SernderAddress;

  const receiverName = req.body.ReceiverName;
  const receiverPhone = req.body.ReceiverPhone;
  const receiverAddress = req.body.ReceiverAddress;

  const productName = req.body.ProductName;
  const CompanyID = req.body.CompanyID;
  const Cost = dollar2f;
  const ModeofPayment = req.body.ModeOfpayment;
  const Notes = req.body.Notes;
  const Status = 'Cho Xac Nhan';
  const CreateDate = day + time;

  console.log('NGười gửi: ' + senderName);

  const reqQuery = queryString.stringify({
    id,
    senderName,
    senderPhone,
    senderAddress,
    receiverName,
    receiverPhone,
    receiverAddress,
    productName,
    CompanyID,
    Cost,
    ModeofPayment,
    Notes,
    transactions,
    CreateDate,
  });
  console.log('Info' + reqQuery);
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url:
        //'http://localhost:3321/paypal_api/payment/paySuccess?dollar2f=' + dollar2f,
        `http://localhost:3321/paypal_api/payment/paySuccess/?${reqQuery}`,
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
  const {
    id,
    senderName,
    senderPhone,
    senderAddress,
    receiverName,
    receiverPhone,
    receiverAddress,
    productName,
    CompanyID,
    Cost,
    ModeofPayment,
    Notes,
    transactions,
    CreateDate,
  } = req.query;
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  //const dollar2f = req.query.dollar2f;
  //console.log(dollar2f);
  console.log('PayerID ' + payerId);
  console.log('PaymentId ' + paymentId);

  console.log('Alo: ' + req.query.senderName);
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: `${Cost}`,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // lưu bill ngay đây....
        const totalPrice = +Cost * 23000;
        const saveBill = new Bill({
          Sender: {
            id: id,
            Name: senderName,
            Phone: senderPhone,
            Address: senderAddress,
          },
          Receiver: {
            Name: receiverName,
            Phone: receiverPhone,
            Address: receiverAddress,
          },
          ProductName: [productName],
          CompanyID: CompanyID,
          Cost: transactions,
          ModeofPayment: ModeofPayment,
          Notes: Notes,
          Status: 'Cho Xac Nhan',
          CreateDate: CreateDate,
          DeliveryDate: ' ',
          ReceivedDate: ' ',
          CancelDate: ' ',
        });
        const bill = await saveBill.save();
        console.log(JSON.stringify(payment));
        res.send('Success');
      }
    },
  );
};
module.exports = { Payment, PaymentSuccess };
