const connection = require('./connection');

const makeSale = async (saleArray) => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
    [],
  );
  const { insertId } = sales;
  const message = {
    id: insertId,
    itemsSold: saleArray,
  };
  saleArray.forEach(async (element) => {
    const { productId, quantity } = element;
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  return message;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM 
      StoreManager.sales_products AS sp
    INNER JOIN 
      StoreManager.sales AS s
    ON s.id = sale_id
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM 
      StoreManager.sales_products AS sp
    INNER JOIN 
      StoreManager.sales AS s
    ON s.id = sale_id
    WHERE sale_id = ?`,
    [id],
  );
  return sales;
};

const deleteSaleById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return { message: 'Sale deleted with success!' };
};

const updateSaleById = async (id, saleArray) => {
  await connection.execute(
    'UPDATE StoreManager.sales SET date = default WHERE id = ?',
    [id],
  );
  
  saleArray.forEach(async (element) => {
    const { productId, quantity } = element;
    await connection.execute(
      'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, id, productId],
    );
  });

  const message = {
    saleId: id,
    itemsUpdated: saleArray,
  };

  return message;
};

module.exports = {
  makeSale,
  getAllSales,
  getSaleById,
};
