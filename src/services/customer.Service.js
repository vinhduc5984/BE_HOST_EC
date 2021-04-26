const { createToken } = require('./jwt.Service');
const bcrypt = require('bcrypt');

const Customer = require('../models/customer.Model');
const Account = require('../models/account.Model');

// Sign UP
const SignupService = async (body) => {
  let { FirstName, LastName, Gmail, Password, Phone, Address, Role } = body;
  FirstName = FirstName.trim();
  LastName = LastName.trim();
  Password = Password.trim();
  Phone = Phone.trim();
  Gmail = Gmail.trim();
  Address = Address.trim();
  Role = Role.trim();
  // _id=_id.trim();
  console.log(body._id);
  if (
    FirstName == '' ||
    LastName == '' ||
    Password == '' ||
    Phone == '' ||
    Gmail == '' ||
    Address == '' ||
    Role == ''
  ) {
    return {
      msg: 'Any field is empty!',
      statusCode: 300,
    };
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Gmail)) {
    return {
      msg: 'Invalid Gmail',
      statusCode: 300,
    };
  } else if (Password.length < 6) {
    return {
      msg: 'Password is short',
      statusCode: 300,
    };
  } else {
    // check exist Gmail
    try {
      //console.log(Gmail)
      const result = await Customer.find({ Gmail });
      console.log(Gmail);
      if (result) {
        if (result.lenght) {
          return {
            msg: 'Gmail is existed',
            statusCode: 300,
          };
        } else {
          // Create new Customer
          // Hash password
          const saltOrRound = 8;
          const hassPassword = await bcrypt.hash(Password, saltOrRound);
          const newCustomer = new Customer({
            FirstName,
            LastName,
            Gmail,
            Password: hassPassword,
            Phone,
            Address,
            Role,
          });

          // console.log(newCustomer);

          // save Customer
          const resSave = await newCustomer.save();
          if (resSave) {
            //create account
            const newAccount = new Account({
              _id: resSave._id,
              Gmail,
              Password: hassPassword,
              Role,
            });
            newAccount.save();
            return {
              msg: 'SignUp SUCCESSFUL',
              statusCode: 200,
            };
          } else {
            return {
              msg: 'Error while saving new Customer',
              statusCode: 300,
            };
          }
        }
      }
    } catch (err) {
      console.log(err);
      return {
        msg: 'Error while checking existed Customer',
        statusCode: 300,
      };
    }
  }

  /*const resultc = await newAccount.save();
    if(resultc)
    {
        return {
            msg:"Create Accout SUCCESSFUL",
            statusCode:201
        }
    }
    else{
        return {
            msg:"Error while saving new Account",
            statusCode:300
        }
    }*/
};

// Sign in
const SigninService = async (body) => {
  let { Gmail, Password } = body;
  Gmail = Gmail.trim();
  Password = Password.trim();
  if (Gmail == '' || Password == '') {
    return {
      msg: 'Gmail or Password is empty',
      statusCode: 300,
    };
  } else {
    // kiểm tra tài khoản tồn tại trong Account chưa
    const data = await Account.findOne({ Gmail });
    console.log(data);
    if (data != null) {
      const hashPassword = data.Password;
      const result = bcrypt.compare(Password, hashPassword);
      try {
        if (result) {
          const id = data._id;
          const token = createToken(id);
          return {
            msg: 'Sign In Successful ',
            statusCode: 200,
            data: token,
          };
        } else {
          return {
            msg: 'Incorrect Password',
            statusCode: 300,
          };
        }
      } catch {
        return {
          msg: 'Error while checking password',
          statusCode: 300,
        };
      }
    } else {
      return {
        msg: 'Gmail is not exist',
        statusCode: 300,
      };
    }
  }
};

module.exports = { SignupService, SigninService };
