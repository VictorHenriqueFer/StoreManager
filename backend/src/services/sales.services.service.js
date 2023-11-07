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
  const salesObj = sales.map((sale) => salesModel.createSalesProducts(createSale.id, sale));
  await Promise.all(salesObj);
  return { status: 201, data: { id: createSale.id, itemsSold: sales } };
};

const deleteSale = async (id) => {
  const sales = await salesModel.findById(id);
  if (!sales.length) return { status: 404, data: { message: 'Sale not found' } };
  await salesModel.deleteSale(id);
  return { status: 204 };
};

const updateSales = async (id, productId, quantity) => {
  const sales = await salesModel.findById(id);
  await salesModel.updateSale(id, productId, quantity);
  const products = sales.find((product) => product.productId === Number(productId));
  return { status: 200,
    data: { saleId: Number(id),
      productId: Number(productId),
      quantity,
      date: products.date } };
};

module.exports = {
  getAll,
  findById,
  createSales,
  deleteSale,
  updateSales,
};
