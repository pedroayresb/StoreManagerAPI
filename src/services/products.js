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

const exclude = async (id) => {
  await productsModel.exclude(id);
  return { type: null };
};

const getBySearchTerm = async (q) => {
  const products = await productsModel.getBySearchTerm(q);
  if (!products) return { type: 'notFound', message: 'Products not found' };
  return { type: null, message: products };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getBySearchTerm,
};
