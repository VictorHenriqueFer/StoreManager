const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProducts } = require('../middlewares/validateProducts');

route.get('/', productsController.getAll);

route.get('/:id', productsController.getAllById);

route.post(
  '/',
  validateProducts,
  productsController.insertProduct,
);

module.exports = route;