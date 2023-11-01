const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesFromService, salesFromServiceId, salesFromServiceInsert } = require('../../mocks/sales.mock');
const salesController = require('../../../src/controllers/sales.controller');

describe('Testa se o controller retorna todos os produtos', function () {
  it('Testa se o controller retorno todos os produtos corretos', async function () {
    sinon.stub(salesServices, 'getAll')
      .resolves({ status: 200, data: salesFromService });
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromService);
  });
  it('Teste se o controller retorna um produto', async function () {
    sinon.stub(salesServices, 'findById')
      .resolves({ status: 200, data: salesFromServiceId });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await salesController.getAllById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromServiceId);
  });
  it('Teste se o controller insere um produto', async function () {
    sinon.stub(salesServices, 'createSales')
      .resolves({ status: 201, data: salesFromServiceInsert });
    const req = { body: { name: 'Martelo de Thor' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await salesController.createSales(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesFromServiceInsert);
  });
  afterEach(function () {
    sinon.restore();
  });
});