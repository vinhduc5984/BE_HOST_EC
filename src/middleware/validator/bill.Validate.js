const joi = require('@hapi/joi');

const SchemaBill = {
  createbill: joi.object().keys({
    Sender: {
      id: joi.number().required(),
      Name: joi.string().required(),
      Phone: joi.string().required(),
      Address: joi.string().required(),
    },
    Receiver: {
      Name: joi.string().required(),
      Phone: joi.string().required(),
      Address: joi.string().required(),
    },
    ProductName: joi.array().items(joi.string()),
    CompanyID: joi.string().required(),
    Cost: joi.number().required(),
    ModeofPayment: joi.string().required(),
    Notes: joi.string().required(),
    Status: joi.string().required(),
    CreateDate: joi.string().required(),
    DeliveryDate: joi.string().required(),
    ReceivedDate: joi.string().required(),
    CancelDate: joi.string().required(),
  }),
};

module.exports = SchemaBill;
