const saleReturn = {
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

const allSales = [
  {
    saleId: 1,
    date: '2021-08-10T03:00:00.000Z',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 1,
    date: '2021-08-10T03:00:00.000Z',
    productId: 2,
    quantity: 1,
  },
  {
    saleId: 2,
    date: '2021-08-10T03:00:00.000Z',
    productId: 1,
    quantity: 1,
  },
  {
    saleId: 2,
    date: '2021-08-10T03:00:00.000Z',
    productId: 2,
    quantity: 1,
  },
];


const saleArray = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 1,
  },
];

module.exports = {
  saleReturn,
  saleArray,
  allSales,
};
