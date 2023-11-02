const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { status: 200, data: products };
};
const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};
const insertProduct = async (name) => {
  const product = await productsModel.insertProduct(name);
  console.log(product);
  return { status: 201, data: product };
};

const updateProduct = async (id, name) => {
  const product = await productsModel.updateProduct(id, name);
  return { status: 200, data: product };
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
  return { status: 204 };
};

module.exports = {
  getAll,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
