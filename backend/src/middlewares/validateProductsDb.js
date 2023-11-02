const { productsModel } = require('../models');

const validateProductsDb = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const productsIdExist = await productsModel.getAll();
  const productsArray = productsIdExist.map((item) => item.id);
  console.log(productsArray);
  const productsId = productsArray.some((product) => product === Number(id));
  console.log(productsId, 'birllllll');
  if (!productsId) {
    return res.status(404)
      .json({ message: 'Product not found' }); 
  }
  next();
};

module.exports = validateProductsDb;