const { salesServices } = require('../services');

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();
  return res.status(sales.status).json(sales.data);
};

const getAllById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findById(id);
  return res.status(sale.status).json(sale.data);
}; 

const createSales = async (req, res) => {
  const { body } = req;
  const newSale = await salesServices.createSales(body);
  return res.status(newSale.status).json(newSale.data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.deleteSale(id);
  return res.status(sale.status).json(sale.data);
};

const updateSales = async (req, res) => {
  const { id, productId } = req.params;
  const { quantity } = req.body;

  const sale = await salesServices.updateSales(id, productId, quantity);
  return res.status(sale.status).json(sale.data);
};

module.exports = {
  getAll,
  getAllById,
  createSales,
  deleteSale,
  updateSales,
};