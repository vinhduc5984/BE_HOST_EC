const controller = require('./index');
const { GetProfile } = require('../services/user.Service');

const getProfile = async (req, res, next) => {
  const resService = await GetProfile(req, res, next);
};

module.exports = {
  getProfile,
};
