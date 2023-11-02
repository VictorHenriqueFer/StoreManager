const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProducts } = require('../middlewares/validateProducts');
const validateProductsDb = require('../middlewares/validateProductsDb');

route.get('/', productsController.getAll);

route.get('/:id', productsController.getAllById);

route.post(
  '/',
  validateProducts,
  productsController.insertProduct,
);

route.put(
  '/:id',
  validateProductsDb,
  validateProducts,
  productsController.updateProduct,
);

route.delete(
  '/:id',
  validateProductsDb,
  productsController.deleteProduct,
);

module.exports = route;