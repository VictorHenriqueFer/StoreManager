const { productsModel } = require('../models');

const validateProductsDb = async (req, res, next) => {
  const { id } = req.params;
  const productsIdExist = await productsModel.getAll();
  const productsArray = productsIdExist.map((item) => item.id);
  const productsId = productsArray.some((product) => product === Number(id));
  if (!productsId) {
    return res.status(404)
      .json({ message: 'Product not found' }); 
  }
  next();
};

module.exports = validateProductsDb;