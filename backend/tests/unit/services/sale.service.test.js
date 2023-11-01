const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesFromService, salesFromServiceId, salesFromServiceInsert } = require('../../mocks/sales.mock');
const { salesModel } = require('../../../src/models');

describe('Testa o service de vendas', function () {
  it('Testa se o service de vendas retorna o objeto correto', async function () {
    sinon.stub(salesModel, 'getAll')
      .resolves(salesFromService);

    const sales = await salesServices.getAll();

    expect(sales.data).to.be.equal(salesFromService);
  });
  it('Testa se o retorno da função findById está correto', async function () {
    sinon.stub(salesModel, 'findById')
      .resolves(salesFromServiceId);

    const sales = await salesServices.findById(1);

    expect(sales.data).to.be.equal(salesFromServiceId);
  });
  it('Testa se o retorno do status code da getAll está correto', async function () {
    sinon.stub(salesModel, 'getAll')
      .resolves({ status: 200 });

    const sales = await salesServices.getAll();

    expect(sales.data).to.be.deep.equal({ status: 200 });
  });
  it('Testa se o retorno do status code da findById está correto', async function () {
    sinon.stub(salesModel, 'findById')
      .resolves({ status: 200 });

    const sales = await salesServices.findById(1);

    expect(sales.data).to.be.deep.equal({ status: 200 });
  });
  it('Testa se o retorno da insertSale está correto', async function () {
    sinon.stub(salesModel, 'createSale')
      .resolves({ id: 1 });
    sinon.stub(salesModel, 'createSalesProducts')
      .resolves(salesFromServiceInsert);

    const sales = await salesServices.createSales(salesFromServiceInsert);

    expect(sales.data).to.be.deep.equal({ id: 1, itemsSold: salesFromServiceInsert });
  });
  afterEach(function () {
    sinon.restore();
  });
});
