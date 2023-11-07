const productsFromModel = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
  ],
  
];

const productsFromId = [[{
  id: 1,
  name: 'Martelo de Thor',
}]];

const productsFromService = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];
const productsFromServiceId = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromServiceInsert = {
  id: 3,
  name: 'Traje de encolhimento',
};

const productsFromServiceUpdate = [
  {
    id: 1,
    name: 'Martelo de Batman',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

module.exports = {
  productsFromModel,
  productsFromId,
  productsFromService,
  productsFromServiceId,
  productsFromServiceInsert,
  productsFromServiceUpdate,
};