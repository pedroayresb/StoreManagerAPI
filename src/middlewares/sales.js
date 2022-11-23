const productsModel = require('../models/products');

const validateSaleQuantity = async (req, res, next) => {
  const { body } = req;
  const hasQuantity = body.some((sale) => Number(sale.quantity) <= 0);
  if (hasQuantity) {
    return res
      .status(422)
      .json({ type: true, message: '"quantity" must be larger than or equal to 1' });
  }

  const hasQuantityID = body.every((sale) => !sale.quantity);
  if (hasQuantityID) {
    return res.status(400).json({ type: true, message: '"quantity" is required' });
  }

  next();
};

const validateSaleProduct = async (req, res, next) => {
  const { body } = req;
  const allProds = await productsModel.getAll();
  const hasInvalidProduct = body.every((sale) => {
  const produc = allProds.find((prod) => prod.id === sale.productId);
    if (!produc) return false;
    return true;
  });
  
  if (!hasInvalidProduct) {
    return res.status(422).json({ type: true, message: '"productId" not found' });
  }

  const hasProductID = body.every((sale) => !sale.productId);
  if (hasProductID) {
    return res.status(400).json({ type: true, message: '"productId" is required' });
  }

  next();
 };

module.exports = {
  validateSaleQuantity,
  validateSaleProduct,
};