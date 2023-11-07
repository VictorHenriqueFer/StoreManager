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

    expect(sales).to.deep.equal(salesFromId[0]);
  });
  it('Testa se o model de vendas insere uma venda', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const sales = await salesModel.createSale();

    expect(sales).to.deep.equal({ id: 1 });
  });
  it('Testa se a função createSalesProducts insere uma venda', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const sales = await salesModel.createSalesProducts(1, { productId: 1, quantity: 1 });

    expect(sales).to.deep.equal({ productId: 1, quantity: 1 });
  });
  it('Testa se o model deleta uma venda', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const sales = await salesModel.deleteSale(1);

    expect(sales).to.deep.equal({ id: 1 });
  });
  it('Testa se o model atualiza uma venda', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const sales = await salesModel.updateSale(1, 1, 1);

    expect(sales).to.deep.equal({ productId: 1, quantity: 1, saleId: 1 });
  });
  afterEach(function () {
    sinon.restore();
  });
});
