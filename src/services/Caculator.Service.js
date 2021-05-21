const CostSheet = require('../models/costSheet.Model');

const Caculator = async (body) => {
  let { id } = body;
  console.log(id);
  id = id.trim();
  const _id = id;
  //const DataCom= await CostSheet.find({id})
  const DataCom = await CostSheet.findOne({ _id: id });
  console.log(DataCom);
  if (!DataCom) {
    return {
      msg: 'not found data Com',
      statusCode: 300,
    };
  } else {
    return {
      msg: 'get data company successful',
      statusCode: 200,
      data: DataCom,
    };
  }
};

module.exports = { Caculator };
