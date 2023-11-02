const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products);
};

const findById = async (id) => {
  const retornoExecute = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  const [[product]] = retornoExecute;
  return camelize(product);
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
}; 

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return { id };
};

module.exports = {
  getAll,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct,
};