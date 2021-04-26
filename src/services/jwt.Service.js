require('dotenv').config();
const jwt = require('jsonwebtoken');
const serectKey = process.env.ACCESS_TOKEN_SERECT;
console.log(serectKey);

function createToken(data) {
  return jwt.sign(
    {
      data: data, //{} {name:"duc",age:16}
      iss: 'phung vinh duc',
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    serectKey,
  );
}

function verify(req, res, next) {
  const header = req.headers.authorization;
  //headers
  /*
        authorization
        content
    */
  console.log(header);

  if (!header) {
    res.json({
      data: {
        tokenVerificationData: { access: false, message: 'No token provided' },
      },
    });
    return;
  }
  const token = header.split(' ')[1];
  console.log('tokenService token: ' + token);
  jwt.verify(token, serectKey, (err, decodedFromToken) => {
    if (err) {
      res.json({
        data: {
          tokenVerificationData: {
            access: false,
            message: 'Failed to verify token',
          },
        },
      });
      return;
    } else {
      console.log(decodedFromToken);
      // there's decodedFromToken.user that can only be reached with casting
      // that's why it is wrapped in <{user: object}>
      // const decoded = <{user: object}>decodedFromToken;
      // const decodedUser = <ISafeUser>decoded.user;
      // // res.json({tokenVerificationData: { access: true, user: decodedUser } });
      // req.verifiedUser = decodedUser;

      req.value = { body: { token: decodedFromToken } };

      next();
    }
  });
}

module.exports = { verify, createToken };
