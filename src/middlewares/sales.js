const productsModel = require('../models/products');
const salesModel = require('../models/sales');

const validateSaleQuantity = async (req, res, next) => {
  const { body } = req;
  const hasQuantity = body.some((sale) => Number(sale.quantity) <= 0);
  if (hasQuantity) {
    return res
      .status(422)
      .json({ type: true, message: '"quantity" must be greater than or equal to 1' });
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

  const hasProductID = body.every((sale) => !sale.productId);
  if (hasProductID) {
    return res.status(400).json({ type: true, message: '"productId" is required' });
  }

  const hasProduct = body.some((sale) => !allProds.some((prod) => prod.id === sale.productId));
  if (hasProduct) {
    return res.status(404).json({ type: true, message: 'Product not found' });
  }

  next();
};
 
const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  const allSales = await salesModel.getAllSales();
  
  const hasSale = allSales.some((sale) => Number(sale.saleId) === Number(id));
  if (!hasSale) {
    return res.status(404).json({ type: true, message: 'Sale not found' });
  }
  
  next();
};

module.exports = {
  validateSaleQuantity,
  validateSaleProduct,
  validateSaleId,
};