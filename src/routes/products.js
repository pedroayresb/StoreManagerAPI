const router = require('express').Router();
const productsController = require('../controllers/products');

const { productValidate, deleteProductValidate } = require('../middlewares/products');

router
  .get('/', productsController.getProducts)
  .get('/search', productsController.getProductBySearchTerm)
  .post('/', productValidate, productsController.createProduct)
  .get('/:id', productsController.getProductById)
  .put('/:id', productValidate, productsController.updateProduct)
  .delete('/:id', deleteProductValidate, productsController.deleteProduct);

module.exports = router;