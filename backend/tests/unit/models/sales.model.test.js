const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesModel } = require('../../../src/models');
const {
  salesFromModel,
  salesFromId,
} = require('../../mocks/sales.mock');

const connection = require('../../../src/models/connection');

describe('Testa o model de vendas', function () {
  it('Testa se o model de vendas retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute')
      .resolves(salesFromModel);
      
    const sales = await salesModel.getAll();
      
    expect(sales).to.deep.equal(salesFromModel[0]);
  });
      
  it('Testa se o model de vendas retorna uma venda', async function () {
    sinon.stub(connection, 'execute')
      .resolves(salesFromId);

    const sales = await salesModel.findById(1);

    expect(sales).to.deep.equal(salesFromId[0][0]);
  });
  afterEach(function () {
    sinon.restore();
  });
});
