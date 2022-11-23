const productsModel = require('../models/products');

const productValidate = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ type: true, message: '"name" is required' });
  }

  if (name.length < 5) {
    return res
      .status(422)
      .json({ type: true, message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const deleteProductValidate = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.getById(id);

  if (product.length === 0) {
    return res.status(404).json({ type: true, message: 'Product not found' });
  }

  next();
};

module.exports = { productValidate, deleteProductValidate };