const salesModel = require('../models/sales');

const makeSale = async (saleArray) => {
  const message = await salesModel.makeSale(saleArray);
  return { type: null, message };
};

module.exports = {
  makeSale,
};