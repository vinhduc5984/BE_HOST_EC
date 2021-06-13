const joi = require('@hapi/joi');

const SchemaCompany = {
  signup: joi.object().keys({
    CompanyName: joi.string().required(),
    TIN: joi.string().required(),
    Address: joi.string().required(),
    BusinessLicense: joi.string().required(),
    Logo: joi.string(),
    CompanyGmail: joi.string().email().required(),
    Phone: joi.string(),
    Description: joi.string(),
    Delegate: {
      FirstName: joi.string().required(),
      LastName: joi.string().required(),
      Email: joi.string().required(),
      Phone: joi.string().required(),
      Position: joi.string().required(),
    },
    Commission: joi.number(),
    RegistrationPackage: joi.string(),
    Status: joi.string(),
  }),
};
module.exports = SchemaCompany;
