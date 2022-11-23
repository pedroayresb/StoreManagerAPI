const productsModel = require('../models/products');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 'notFound', message: 'Product not found' };
  return { type: null, message: product };
};

const create = async (name) => {
  const product = await productsModel.create(name);
  return { type: null, message: product };
};

const update = async (id, name) => {
  const product = await productsModel.update(id, name);
  if (!product) return { type: 'notFound', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
