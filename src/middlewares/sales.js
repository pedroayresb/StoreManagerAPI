const productsModel = require('../models/products');

const validateSaleQuantity = (req, res, next) => {
  req.body.forEach((element) => {
    const { quantity } = element;
    if (!quantity) {
      return res.status(400).json({ type: true, message: '"quantity" is required' });
    }
    if (quantity < 1) {
      return res.status(422)
        .json({ type: true, message: '"quantity" must be greater than or equal to 1' });
    }
  });
  next();
};

const validateSaleProduct = async (req, res, next) => {
  req.body.forEach(async (element) => {
    const { productId } = element;
    if (!productId) {
      return res.status(400).json({ type: true, message: '"productId" is required' });
    }
    const products = productsModel.getAll();
    const product = products.find((prod) => prod.id === productId);
    if (!product) {
      return res.status(422).json({ type: true, message: 'Product not found' });
    }
  });
  next();
};

module.exports = {
  validateSaleQuantity,
  validateSaleProduct,
};