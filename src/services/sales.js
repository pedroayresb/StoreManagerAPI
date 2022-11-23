const salesModel = require('../models/sales');

const makeSale = async (saleArray) => {
  const message = await salesModel.makeSale(saleArray);
  return { type: null, message };
};

const getAllSales = async () => {
  const message = await salesModel.getAllSales();
  return message;
};

const getSaleById = async (id) => {
  const message = await salesModel.getSaleById(id);
  return message;
};

module.exports = {
  makeSale,
  getAllSales,
  getSaleById,
};