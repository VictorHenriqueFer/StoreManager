const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
FROM sales_products AS sp
INNER JOIN sales AS s ON sp.sale_id = s.id
ORDER BY sp.sale_id, sp.product_id;`);
  return camelize(sales);
};

const findById = async (id) => {
  const [[sale]] = await connection.execute(`
SELECT sp.product_id, sp.sale_id, sp.quantity, s.date
FROM sales_products AS sp
INNER JOIN sales AS s ON sp.sale_id = s.id
WHERE sp.sale_id = ?;`, [id]);
  return camelize(sale);
};

const createSale = async () => {
  const [{ insertId }] = await connection.execute(`
INSERT INTO sales () VALUES ();`);
  return { id: insertId };
};

const createSalesProducts = async (saleId, sale) => {
  await connection.execute(
    `
INSERT INTO sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);`, 
    [sale.productId, saleId, sale.quantity],
  );
  return sale;
};

module.exports = {
  getAll,
  findById,
  createSale,
  createSalesProducts,
};