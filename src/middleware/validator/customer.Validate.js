const joi = require('@hapi/joi');

const SchemaCustomer = {
  signin: joi.object().keys({
    Gmail: joi.string().email().required(),
    Password: joi.string().min(6).max(24).required(),
  }),
  signup: joi.object().keys({
    FirstName: joi.string().required(),
    LastName: joi.string().required(),
    Gmail: joi.string().email().required(),
    Password: joi.string().required(),
    Phone: joi.string(),
    Address: joi.string(),
  }),
  forgetpassword: joi.object().keys({
    Gmail: joi.string().email().required(),
  }),
  changepassword: joi.object().keys({
    Password: joi.string().required(),
    NewPassword: joi.string().required(),
    ConfirmPassword: joi.string().required(),
  }),
};

module.exports = SchemaCustomer;
