const productsServices = require('../services/products');

const getProducts = async (req, res) => {
  const { message } = await productsServices.getAll();
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getById(id);
  if (type !== null) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsServices.create(name);
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.update(id, name);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsServices.exclude(id);
  return res.status(204).json();
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};