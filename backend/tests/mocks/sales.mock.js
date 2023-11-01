const salesFromModel = [[
  {
    saleId: 1,
    date: '2023-10-23T18:56:47.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-10-23T18:56:47.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-10-23T18:56:47.000Z',
    productId: 3,
    quantity: 15,
  },
]];

const salesFromId = [[
    
  {
    saleId: 1,
    date: '2023-10-23T18:56:47.000Z',
    productId: 1,
    quantity: 5,
  },
]];

const salesFromService = [
  {
    id: 1,
    date: '2023-12-23T18:56:47.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    id: 1,
    date: '2023-11-23T18:56:47.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    id: 2,
    date: '2023-11-23T18:56:47.000Z',
    productId: 3,
    quantity: 15,
  },
];
const salesFromServiceId = {
  id: 1,
  date: '2023-11-23T18:56:47.000Z',
  productId: 1,
  quantity: 5,
};

const salesFromServiceInsert = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  salesFromModel,
  salesFromId,
  salesFromService,
  salesFromServiceId,
  salesFromServiceInsert,
};