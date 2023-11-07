const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSales = require('../middlewares/validateSales');
const validateSalesProducts = require('../middlewares/validateSalesProducts');
const validateUpdateSales = require('../middlewares/validateUpdateSales');

route.get('/', salesController.getAll);

route.get('/:id', salesController.getAllById);

route.post(
  '/',
  validateSales,
  validateSalesProducts,
  salesController.createSales,
);

route.delete(
  '/:id',
  salesController.deleteSale,
);

route.put(
  '/:id/products/:productId/quantity',
  validateUpdateSales,
  salesController.updateSales,
);

module.exports = route;