const { validateProducts } = require('./validateProducts');
const validateProductsDb = require('./validateProductsDb');
const validateSales = require('./validateSales');
const validateSalesProducts = require('./validateSalesProducts');
const validateUpdateSales = require('./validateUpdateSales');

module.exports = {
  validateProducts,
  validateProductsDb,
  validateSales,
  validateSalesProducts,
  validateUpdateSales,
};