const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(products.status).json(products.data);
};

const getAllById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findById(id);
  return res.status(product.status).json(product.data);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.insertProduct(name);
  return res.status(newProduct.status).json(newProduct.data);
};

module.exports = {
  getAll,
  getAllById,
  insertProduct,
};