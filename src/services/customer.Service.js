const { createToken } = require('./jwt.Service');
const { SendMailVetify } = require('./SendMail.Service');
const bcrypt = require('bcrypt');

const Customer = require('../models/customer.Model');
const Account = require('../models/account.Model');
const rand = require('random');
// Sign UP
const SignupService = async (body) => {
  let random = rand.int((min = 0), (max = 999999));
  let { FirstName, LastName, Gmail, Password, Phone, Address } = body;
  FirstName = FirstName.trim();
  LastName = LastName.trim();
  Password = Password.trim();
  Phone = Phone.trim();
  Gmail = Gmail.trim();
  Address = Address.trim();

  if (
    FirstName == '' ||
    LastName == '' ||
    Password == '' ||
    Phone == '' ||
    Gmail == '' ||
    Address == ''
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
      const result = await Customer.find({ Gmail });
      if (result) {
        if (result.length > 0) {
          return {
            msg: 'Gmail is existed',
            statusCode: 300,
          };
        } else {
          // Create new Customer
          // Hash password
          const saltOrRound = 8;
          const hassPassword = await bcrypt.hash(Password, saltOrRound);
          const tokenGmail = Gmail;
          const token = createToken(tokenGmail);
          const newCustomer = new Customer({
            FirstName,
            LastName,
            Gmail,
            Password: hassPassword,
            Phone,
            Address,
            Role: 'Customer',
            Vetify: random,
            Token: token,
            DigitalWallet: 0,
          });
          console.log('newCucs', newCustomer);
          //           console.log(newCustomer.Gmail);
          // save Customer
          const resSave = await newCustomer.save();
          if (resSave) {
            console.log(resSave);
            //create account
            const newAccount = new Account({
              _id: resSave._id.toString(),
              Gmail,
              Password: hassPassword,
              Role: 'Customer',
              Vetify: random,
            });
            await newAccount.save();
            const resMail = await SendMailVetify(
              resSave.Gmail,
              'Xác Thực Tài Khoản',
              resSave.Vetify,
              null,
            );
            console.log(newAccount);
            console.log(resMail);
            const DataUser = resSave.Token;
            return {
              msg: 'SignUp SUCCESSFUL',
              statusCode: 200,
              data: DataUser,
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

// Vertify customer

const VetifyService = async (body) => {
  let { tokenG, Vetify } = body;
  //tokenG enroofi
  // tokenG = tokenG
  Vetify = Vetify.trim();
  const data = await Customer.findOne({ Gmail: tokenG });
  console.log(data);
  if (data) {
    if (data.Vetify == Vetify) {
      data.Vetify = 'true';
      await data.save();
      const data1 = await Account.findById(data._id);
      data1.Vetify = 'true';
      await data1.save();
      return {
        msg: 'Vetify Successful',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'Vetify Not Success',
        statusCode: 300,
      };
    }
  }
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
      const result = await bcrypt.compare(Password, hashPassword);
      try {
        if (result) {
          const id = data._id;
          const token = createToken(id);
          if (data.Vetify !== 'true') {
            return {
              msg: 'Account not veryfy',
              statusCode: 300,
            };
          }
          return {
            msg: 'Sign In Successful ',
            statusCode: 200,
            data: {
              Token: token,
              Role: data.Role,
            },
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

// forget password
const ForgetPasswordService = async (body) => {
  try {
    let { Gmail } = body;
    Gmail = Gmail.trim();
    const data = await Account.findOne({ Gmail });
    const dataCus = await Customer.findOne({ Gmail });
    let random = rand.int((min = 0), (max = 999999));
    random = random + '';
    if (data) {
      const saltOrRound = 8;
      const hassPassword = await bcrypt.hash(random, saltOrRound);
      data.Password = hassPassword;
      await data.save();
      dataCus.Password = hassPassword;
      await dataCus.save();
      const resMail = SendMailVetify(
        Gmail,
        'Mật Khẩu mới của bạn',
        random,
        null,
      );
      return {
        msg: 'Get Password Success',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'Get Password false',
        statusCode: 300,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

// change password
const ChangePasswordService = async (IDToken, body) => {
  let { Password, NewPassword, ConfirmPassword } = body;
  Password = Password.trim();
  NewPassword = NewPassword.trim();
  ConfirmPassword = ConfirmPassword.trim();

  const data = await Account.findOne({ _id: IDToken });

  const hashPassword = data.Password;
  const result = await bcrypt.compare(Password, hashPassword);
  if (result) {
    if (NewPassword === ConfirmPassword) {
      const saltOrRound = 8;
      const HashNewPassword = await bcrypt.hash(NewPassword, saltOrRound);
      data.Password = HashNewPassword;
      await data.save();
      const dataCus = await Customer.findOne({ _id: IDToken });
      dataCus.Password = HashNewPassword;
      await dataCus.save();
      return {
        msg: 'Change Password Success',
        statusCode: 200,
      };
    } else {
      return {
        msg: 'New Password and Comfirm Password not match',
        statusCode: 300,
      };
    }
  } else {
    return {
      msg: 'Error white change Password',
      statusCode: 300,
    };
  }
};

const getUserData = async (body) => {
  let { id } = body;
  const data = await Customer.findOne({ _id: id });
  if (!data) {
    return {
      msg: 'Error whilte get data User',
      statusCode: 300,
    };
  } else {
    return {
      msg: 'get Data Account',
      statusCode: 200,
      data: data,
    };
  }
};

const UpdateDataCustomer = async (id, body) => {
  try {
    console.log(id);
    const data = await Customer.findOneAndUpdate({ _id: ~~id }, body);
    console.log(data);
    //check data null
    return {
      msg: 'update Data Customer',
      statusCode: 200,
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error whilte update data Customer',
      statusCode: 300,
    };
  }
};

module.exports = {
  SignupService,
  SigninService,
  VetifyService,
  ForgetPasswordService,
  ChangePasswordService,
  getUserData,
  UpdateDataCustomer,
};
