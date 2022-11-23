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

module.exports = {
  makeSale,
};
