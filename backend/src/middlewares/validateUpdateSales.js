const { productsModel } = require('../models');

const validateUpdateSales = async (req, res, next) => {
  const itemsSold = req.body;

  const productsIdExist = await productsModel.getAll();
  const productsId = productsIdExist.map((product) => product.id);
  const productsIncludes = req.body.every((item) => productsId.includes(item.productId));
  if (!productsIncludes) {
    return res.status(404)
      .json({ message: 'Product not found in sale' }); 
  }

  const validationValueQuantity = itemsSold.map((item) => item.quantity <= 0);
  if (validationValueQuantity.includes(true)) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  const arrayItemSold = itemsSold.every((item) => item.quantity);
  if (!arrayItemSold) return res.status(404).json({ message: '"quantity" is required,BIRL22' });
  next();
};

module.exports = validateUpdateSales;