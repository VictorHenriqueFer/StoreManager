const { salesModel } = require('../models');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 200, data: sales };
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);
  if (!sales.length) return { status: 404, data: { message: 'Sale not found' } };
  return { status: 200, data: sales };
};

const createSales = async (sales) => {
  const createSale = await salesModel.createSale();
  const salesObj = sales.map(async (sale) => salesModel.createSalesProducts(createSale.id, sale));
  await Promise.all(salesObj);
  return { status: 201, data: { id: createSale.id, itemsSold: sales } };
};

module.exports = {
  getAll,
  findById,
  createSales,
};
