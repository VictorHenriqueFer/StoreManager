const { productsModel, salesModel } = require('../models');

const validateUpdateSales = async (req, res, next) => {
  const { id } = req.params;

  const productsIdExist = await productsModel.getAll();
  const productsId = productsIdExist.map((product) => product.id);
  const productsIncludes = req.body.every((item) => productsId.includes(item.productId));
  if (!productsIncludes) {
    return res.status(404)
      .json({ message: 'Product not found in sale' }); 
  }
  const salesExists = await salesModel.getAll();
  const salesId = salesExists.map((sale) => sale.id);
  const salesIncludes = salesId.some((sale) => sale === Number(id));
  if (!salesIncludes) {
    return res.status(404)
      .json({ message: 'Sale not found' }); 
  }

  next();
};

module.exports = validateUpdateSales;