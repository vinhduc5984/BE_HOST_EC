const CostSheet = require('../models/costSheet.Model');
const Promotion = require('../models/promotion.Model');
const dateFormat = require('dateformat');

const caculatorCost = async (body) => {
  let { Kg, Km } = body;
  try {
    const Company = await CostSheet.find({});

    var objCosts = [];
    const now = new Date();

    for (const i in Company) {
      var objCost = {};
      const data = Company[i];
      const cost = data.Cost;
      const kg = Number(data.Kg);
      var sur = 0;
      var index;

      //compare kg
      if (Kg > kg) {
        const surcharge = data.Surcharge.split('/').map(Number);
        sur = (Kg - kg) * (surcharge[0] / surcharge[1]);
      }

      //compare km

      Km = Number(Km);
      const popCost = cost.pop();
      var numKm = popCost.Km.match(/\d/gi);
      numKm = numKm.join('');

      if (Km > Number(numKm)) {
        index = popCost;
      } else {
        for (const j in cost) {
          const km = Number(cost[j].Km);
          if (km >= Km) {
            index = cost[j];
            break;
          }
        }
      }

      //Cacalator Cost
      var FinalCost = sur + Number(index.Cost);
      FinalCost = (FinalCost + FinalCost * Number(data.VAT)) * 1000;
      FinalCost = Math.round(FinalCost * 100) / 100;

      //Check Promotion
      const CompanyId = data.CompanyId;
      const promotion = await Promotion.find({ CompanyId });
      if (promotion.length > 0) {
        const description = promotion[0].Description;
        var n = description.length - 1;
        var StartDate = description[n].StartDate;
        var startDate = StartDate.split('/');
        StartDate = new Date(startDate[2], startDate[1] - 1, startDate[0]);

        if (now.getDate() >= StartDate.getDate()) {
          var EndDate = description[n].EndDate;
          var endDate = EndDate.split('/');
          EndDate = new Date(endDate[2], endDate[1] - 1, endDate[0]);
          if (now.getDate() <= EndDate.getDate()) {
            var Discount = description[n].Discount;
            var discount = Discount.match(/\d/gi);
            discount = discount.join('');
            FinalCost = FinalCost - (FinalCost * Number(discount)) / 100;
            FinalCost = Math.round(FinalCost * 100) / 100;
          }
        }
      }

      //Caculator Delivery Time
      const numDay = index.DeliveryTime.split('-').map(Number);
      var day = new Date();
      var getDay = [];
      getDay[0] = dateFormat(
        day.setDate(now.getDate() + numDay[0]),
        'dd/mm/yyyy',
      );
      getDay[1] = dateFormat(
        day.setDate(now.getDate() + numDay[1]),
        'dd/mm/yyyy',
      );
      var DeliveryTime = getDay[0].toString() + '-' + getDay[1].toString();

      objCost.CompanyId = data.CompanyId;
      objCost.Cost = FinalCost;
      objCost.DeliveryTime = DeliveryTime;
      objCosts[i] = objCost;
    }
    console.log(objCosts);
    return {
      msg: 'Caculator Freight Cost successful',
      statusCode: 200,
      data: objCosts,
    };
  } catch (err) {
    console.log(err);
    return {
      msg: 'Error Freight Cost Caculator',
      statusCode: 300,
    };
  }
};

module.exports = { caculatorCost };
