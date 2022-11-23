const router = require('express').Router();
const salesController = require('../controllers/sales');

const { validateSaleQuantity,
  validateSaleProduct,
  validateSaleId } = require('../middlewares/sales');

router
  .post('/', validateSaleProduct, validateSaleQuantity, salesController.makeSale)
  .get('/', salesController.getAllSales)
  .get('/:id', validateSaleId, salesController.getSaleById);

module.exports = router;