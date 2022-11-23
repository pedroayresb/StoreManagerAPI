const router = require('express').Router();
const salesController = require('../controllers/sales');

router
  .post('/', salesController.makeSale);

module.exports = router;