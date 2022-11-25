const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return product;
};

const create = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const { insertId } = product;
  const [[newProduct]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [insertId],
  );
  return newProduct;
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name=? WHERE id=?',
    [name, id],
  );
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?',
    [id],
  );
  return product;
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?',
    [id],
  );
  return 204;
};

const getBySearchTerm = async (q) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${q}%`],
  );
  return products;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
  getBySearchTerm,
};