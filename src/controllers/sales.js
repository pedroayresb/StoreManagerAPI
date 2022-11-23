const salesService = require('../services/sales');

const makeSale = async (req, res) => {
  const { type, message } = await salesService.makeSale(req.body);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  makeSale,
};
