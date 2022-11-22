const router = require('express').Router();
const productsRouter = require('../controllers/products');

router
  .get('/', productsRouter.getProducts)
  .get('/:id', productsRouter.getProductById);

module.exports = router;