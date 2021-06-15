const { createToken } = require('./jwt.Service');
const { SendMailVetify } = require('./SendMail.Service');
const bcrypt = require('bcrypt');

const ServicePackage = require('../models//servicepackage.Model');

const creatPackage = async (body) => {
  let { Name, Quantity, Price } = body;

  try {
    const newPackage = new ServicePackage({
      Name,
      Quantity,
      Price,
    });
    console.log('newPackage', newPackage);
    await newPackage.save();
    return {
      msg: 'Create new Service Package Successful',
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error While Create new Service Package',
      statusCode: 300,
    };
  }
};

const getPackage = async (body) => {
  try {
    const Package = await ServicePackage.find({});
    console.log(Package);
    if (Package.length <= 0) {
      return {
        msg: 'not have Service Package',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'get data Service Package successful',
        statusCode: 200,
        data: Package,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error While get data Service Package',
      statusCode: 300,
    };
  }
};

const editPackage = async (body) => {
  let { _id, Name, Quantity, Price } = body;
  try {
    const Package = await ServicePackage.findById(_id);
    console.log(Package);
    if (!Package) {
      return {
        msg: 'not found Service Package',
        statusCode: 300,
      };
    } else {
      const value = { Name, Quantity, Price };
      await ServicePackage.updateOne({ _id }, value);
      const newPackage = await ServicePackage.findById(_id);
      return {
        msg: 'update Service Package successful',
        statusCode: 200,
        data: newPackage,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while update Service Package',
      statusCode: 300,
    };
  }
};

const deletePackage = async (body) => {
  let { _id } = body;
  try {
    const Package = await ServicePackage.findById(_id);
    console.log(Package);
    if (!Package) {
      return {
        msg: 'not found Service Package',
        statusCode: 300,
      };
    } else {
      await ServicePackage.deleteOne({ _id });
      return {
        msg: 'delete Service Package successful',
        statusCode: 200,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while delete Service Package',
      statusCode: 300,
    };
  }
};

module.exports = {
  creatPackage,
  getPackage,
  editPackage,
  deletePackage,
};
