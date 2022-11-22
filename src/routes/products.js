const router = require('express').Router();
const { getProducts, getProductById } = require('../controllers/products');

router
  .get('/', getProducts)
  .get('/:id', getProductById);

module.exports = router;