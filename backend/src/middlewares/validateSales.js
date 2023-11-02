const validateSales = async (req, res, next) => {
  const itemsSold = req.body;
  const arrayProductsId = itemsSold.every((item) => item.productId);
  if (!arrayProductsId) return res.status(404).json({ message: '"productId" is required,BIRL11' });

  const validationValueQuantity = itemsSold.map((item) => item.quantity <= 0);
  if (validationValueQuantity.includes(true)) {
    return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  
  const arrayItemSold = itemsSold.every((item) => item.quantity);
  if (!arrayItemSold) return res.status(404).json({ message: '"quantity" is required,BIRL22' });

  next();
};

module.exports = validateSales;