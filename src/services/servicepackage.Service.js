const Company = require('../models/company.Model');
const ServicePackage = require('../models//servicepackage.Model');
const dateFormat = require('dateformat');

const creatPackage = async (body) => {
  let { Name, Quantity, Duration, Price } = body;

  try {
    const newPackage = new ServicePackage({
      Name,
      Quantity,
      Duration,
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
  let { id, Name, Quantity, Duration, Price } = body;
  try {
    const Package = await ServicePackage.findById(id);
    console.log(Package);
    if (!Package) {
      return {
        msg: 'not found Service Package',
        statusCode: 300,
      };
    } else {
      Package.Name = Name;
      Package.Quantity = Quantity;
      Package.Duration = Duration;
      Package.Price = Price;
      await Package.save();
      const newPackage = await ServicePackage.findById(id);
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
  let { id } = body;
  try {
    const Package = await ServicePackage.findById(id);
    console.log(Package);
    if (!Package) {
      return {
        msg: 'not found Service Package',
        statusCode: 300,
      };
    } else {
      const _id = id;
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

const checkPackage = async (body) => {
  let { CompanyId } = body;
  try {
    const company = await Company.findById(CompanyId);
    if (company) {
      const register = company.RegistrationPackage;
      //Công ty chỉ đang sài gói free
      if (register.length == 1) {
        return {
          msg: 'Company Can register Service Package',
          statusCode: 200,
        };
      } else {
        const popPack = register[register.length - 1];
        var now = new Date();
        var today = dateFormat(now.setDate(), 'dd/mm/yyyy');
        console.log(today);
        //Gói công ty đang đăng ký còn dùng được
        if (Number(popPack.Quantity) > 0 && popPack.EndDate >= today) {
          return {
            msg: 'Company Cannot register Service Package',
            statusCode: 300,
          };
        } else {
          return {
            msg: 'Company Can register Service Package',
            statusCode: 200,
          };
        }
      }
    } else {
      return {
        msg: 'not found Company',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error While Check Register Service Package',
      statusCode: 300,
    };
  }
};

const registerPackage = async (body) => {
  let { CompanyId, PackageID } = body;
  try {
    const company = await Company.findById(CompanyId);
    if (company) {
      const package = await ServicePackage.findById(PackageID);
      if (package) {
        const register = company.RegistrationPackage;
        var objPack = {};
        var day = new Date();
        var now = new Date();

        objPack.PackageID = PackageID;
        objPack.StartDate = dateFormat(
          day.setDate(now.getDate()),
          'dd/mm/yyyy',
        );
        objPack.EndDate = dateFormat(
          day.setMonth(now.getMonth() + Number(package.Duration)),
          'dd/mm/yyyy',
        );
        objPack.Quantity = package.Quantity;

        register.push(objPack);
        company.RegistrationPackage = register;

        await company.save();
        return {
          msg: 'Company Register Service Package successful',
          statusCode: 200,
        };
      } else {
        return {
          msg: 'not found Service Package',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'not found Company',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error While Register Service Package',
      statusCode: 300,
    };
  }
};

module.exports = {
  creatPackage,
  getPackage,
  editPackage,
  deletePackage,
  registerPackage,
  checkPackage,
};
