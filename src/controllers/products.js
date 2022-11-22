const productsServices = require('../services/products');

const getProducts = (req, res) => {
  const { message } = productsServices.getAll();
  res.status(200).json(message);
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const { type, message } = productsServices.getById(id);
  if (type === 'notFound') return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
};