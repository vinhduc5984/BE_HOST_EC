const bcrypt = require('bcrypt');

const Company = require('../models/company.Model');
const Promotion = require('../models/promotion.Model');

const creatPromotion = async (body) => {
  let { CompanyId, Description } = body;

  try {
    const company = await Promotion.find({ CompanyId });
    if (company) {
      if (company.length > 0) {
        const description = company[0].Description;
        description[description.length] = Description;
        Description = description;
        const value = { CompanyId, Description };
        await Promotion.updateOne({ CompanyId }, value);
        return {
          msg: 'Create Promotion Successful',
          statusCode: 200,
          data: value,
        };
      } else {
        console.log('newCostSheet');
        const newPromotion = new Promotion({
          CompanyId,
          Description,
        });
        console.log('newPromotion', newPromotion);
        await newPromotion.save();
        return {
          msg: 'Create Promotion Successful',
          statusCode: 200,
          data: newPromotion,
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Create Promotion',
      statusCode: 300,
    };
  }
};

const getPromotion = async (body) => {
  let { CompanyId } = body;
  try {
    if (CompanyId) {
      const Company = await Promotion.find({ CompanyId });
      if (Company.length <= 0) {
        return {
          msg: 'not found promotion of Company',
          statusCode: 300,
        };
      } else {
        return {
          msg: 'get data promotion of company successful',
          statusCode: 200,
          data: Company,
        };
      }
    } else {
      const allPromotion = await Promotion.find({});
      return {
        msg: 'get data All promotion successful',
        statusCode: 200,
        data: allPromotion,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while get promotion of company',
      statusCode: 300,
    };
  }
};

const editPromotion = async (body) => {
  let { CompanyId, Description } = body;
  try {
    const Company = await Promotion.find({ CompanyId });
    if (Company.length <= 0) {
      return {
        msg: 'not found promotion of Company',
        statusCode: 300,
      };
    } else {
      const value = { CompanyId, Description };
      await Promotion.updateOne({ CompanyId }, value);
      const newPromotion = await Promotion.find({ CompanyId });
      return {
        msg: 'update Promotion of company successful',
        statusCode: 200,
        data: newPromotion,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while update Promotion of company',
      statusCode: 300,
    };
  }
};

const deletePromotion = async (body) => {
  let { CompanyId } = body;
  try {
    const Company = await Promotion.find({ CompanyId });
    if (Company.length <= 0) {
      return {
        msg: 'not found promotion of Company',
        statusCode: 300,
      };
    } else {
      await Promotion.deleteOne({ CompanyId });
      return {
        msg: 'delete Promotion of company successful',
        statusCode: 200,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while delete Promotion of company',
      statusCode: 300,
    };
  }
};

const deleteOnePomotion = async (body) => {
  let { CompanyId, StartDate } = body;
  try {
    const Company = await Promotion.find({ CompanyId });
    if (Company.length <= 0) {
      return {
        msg: 'not found promotion of Company',
        statusCode: 300,
      };
    } else {
      const Description = Company[0].Description;
      for (const i in Description) {
        var startDate = Description[i].StartDate;
        if (startDate == StartDate) {
          Description.splice(i, 1);
          break;
        }
        return {
          msg: 'not found Promotion',
          statusCode: 200,
        };
      }
      const value = { CompanyId, Description };

      await Promotion.updateOne({ CompanyId }, value);

      return {
        msg: 'delete One Promotion successful',
        statusCode: 200,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error while delete One Promotion',
      statusCode: 300,
    };
  }
};

module.exports = {
  creatPromotion,
  getPromotion,
  editPromotion,
  deletePromotion,
  deleteOnePomotion,
};
