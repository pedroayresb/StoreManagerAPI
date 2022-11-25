const salesService = require('../services/sales');

const makeSale = async (req, res) => {
  const { message } = await salesService.makeSale(req.body);
  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const message = await salesService.getAllSales();
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const message = await salesService.getSaleById(id);
  return res.status(200).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const message = await salesService.deleteSaleById(id);
  return res.status(200).json(message);
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesService.updateSaleById(id, req
    .body);
  return res.status(200).json(message);
};

module.exports = {
  makeSale,
  getAllSales,
  getSaleById,
  deleteSaleById,
  updateSaleById,
};
