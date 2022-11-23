const salesService = require('../services/sales');

const makeSale = async (req, res) => {
  const { message } = await salesService.makeSale(req.body);
  return res.status(201).json(message);
};

module.exports = {
  makeSale,
};
