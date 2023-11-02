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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsServices.updateProduct(id, name);
  return res.status(product.status).json(product.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.deleteProduct(id);
  return res.status(product.status).json(product.data);
};

module.exports = {
  getAll,
  getAllById,
  insertProduct,
  updateProduct,
  deleteProduct,
};