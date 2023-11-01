const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAll);

route.get('/:id', salesController.getAllById);

route.post('/', salesController.createSales);

module.exports = route;