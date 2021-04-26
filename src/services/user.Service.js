const { verify } = require('./jwt.Service');
const Customer = require('../models/customer.Model');

const GetProfile = async (req, res, next) => {
  return verify(req, res, async (idUser) => {
    if (idUser != null) {
      const customer = await Customer.find({ _id: idUser });
      res.json({
        msg: 'Verify successful',
        statusCode: 200,
        data: customer,
      });
    }
    res.json({
      msg: 'Verify fail!',
      statusCode: 400,
    });
  });
  console.log(reulst);
};

module.exports = { GetProfile };
