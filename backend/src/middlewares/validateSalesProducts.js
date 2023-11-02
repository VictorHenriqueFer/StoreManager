const { productsModel } = require('../models');

const validateSalesProducts = async (req, res, next) => {
  const productsIdExist = await productsModel.getAll();
  const productsId = productsIdExist.map((product) => product.id);
  const productsIncludes = req.body.every((item) => productsId.includes(item.productId));
  if (!productsIncludes) {
    return res.status(404)
      .json({ message: 'Product not found' }); 
  }
  next();
};

module.exports = validateSalesProducts;