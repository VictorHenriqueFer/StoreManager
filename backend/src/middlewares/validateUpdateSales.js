const { salesModel } = require('../models');

const validateUpdateSales = async (req, res, next) => {
  const itemsSold = req.body;
  const { id, productId } = req.params;

  const salesIdExist = await salesModel.findById(id);
  if (!salesIdExist.length) return res.status(404).json({ message: 'Sale not found' });
  const productsId = salesIdExist.map((product) => product.productId);
  console.log(productsId);
  const productsIncludes = productsId.includes(Number(productId));
  if (!productsIncludes) {
    return res.status(404).json({ message: 'Product not found in sale' }); 
  }
  if (itemsSold.quantity <= 0) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  if (!itemsSold.quantity) {
    return res.status(400)
      .json({ message: '"quantity" is required' }); 
  }
  next();
};

module.exports = validateUpdateSales;