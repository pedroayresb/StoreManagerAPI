const router = require('express').Router();
const productsController = require('../controllers/products');

const { productValidate, deleteProductValidate } = require('../middlewares/products');

router
  .get('/', productsController.getProducts)
  .get('/:id', productsController.getProductById)
  .post('/', productValidate, productsController.createProduct)
  .put('/:id', productValidate, productsController.updateProduct)
  .delete('/:id', deleteProductValidate, productsController.deleteProduct);

module.exports = router;