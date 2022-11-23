const router = require('express').Router();
const productsController = require('../controllers/products');

const productMiddleware = require('../middlewares/products');

router
  .get('/', productsController.getProducts)
  .get('/:id', productsController.getProductById)
  .post('/', productMiddleware, productsController.createProduct)
  .put('/:id', productMiddleware, productsController.updateProduct);

module.exports = router;