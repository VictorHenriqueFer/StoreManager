const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsFromService, productsFromServiceId, productsFromServiceInsert } = require('../../mocks/product.mock');
const productsController = require('../../../src/controllers/products.controller');

describe('Testa se o controller retorna todos os produtos', function () {
  it('Testa se o controller retorno os produtos corretos', async function () {
    sinon.stub(productsServices, 'getAll')
      .resolves({ status: 200, data: productsFromService });
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromService);
  });
  it('Teste se o controller retorna um produto', async function () {
    sinon.stub(productsServices, 'findById')
      .resolves({ status: 200, data: productsFromServiceId });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await productsController.getAllById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromServiceId);
  });
  it('Teste se o controller insere um produto', async function () {
    sinon.stub(productsServices, 'insertProduct')
      .resolves({ status: 201, data: productsFromServiceInsert });
    const req = { body: { name: 'Martelo de Thor' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await productsController.insertProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsFromServiceInsert);
  });
  it('Testa se o controller atualiza um produto', async function () {
    sinon.stub(productsServices, 'updateProduct')
      .resolves({ status: 200, data: productsFromServiceId });
    const req = { params: { id: 1 }, body: { name: 'Martelo de Thor' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromServiceId);
  });
  it('Testa se o controller deleta um produto', async function () {
    sinon.stub(productsServices, 'deleteProduct')
      .resolves({ status: 204 });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });
  afterEach(function () {
    sinon.restore();
  });
});