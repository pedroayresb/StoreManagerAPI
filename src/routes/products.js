const router = require('express').Router();
const productsRouter = require('../controllers/products');

const productMiddleware = require('../middlewares/products');

router
  .get('/', productsRouter.getProducts)
  .get('/:id', productsRouter.getProductById)
  .post('/', productMiddleware, productsRouter.createProduct);

module.exports = router;