const router = require('express').Router();
const salesController = require('../controllers/sales');

const { validateSaleQuantity, validateSaleProduct } = require('../middlewares/sales');

router
  .post('/', validateSaleProduct, validateSaleQuantity, salesController.makeSale);

module.exports = router;