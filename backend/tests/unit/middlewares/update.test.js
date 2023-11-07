const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const middleware = require('../../../src/middlewares');
const { productsModel } = require('../../../src/models');
const productsMock = require('../../mocks/product.mock');

describe('Testa o middleware de update', function () {
  it('Testa se não é possivel alterar um campo sem o name', async function () {
    const req = { body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateProducts(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Testa se não é possivel alterar um campo com o name menor que 5', async function () {
    const req = { body: { name: 'test' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateProducts(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  it('Testa se não e possivel alterar um produto que não existe', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsMock.productsFromServiceUpdate);
    const req = { body: { name: 'teste' }, params: { id: 3 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateProductsDb(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Testa se passou todas as validações', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsMock.productsFromServiceUpdate);
    const req = { body: { name: 'teste' }, params: { id: 1 } };
    const res = { };
    const next = sinon.stub().returns(); 

    await middleware.validateProductsDb(req, res, next);
    await middleware.validateProducts(req, res, next);
    expect(next).to.have.been.calledWith();
  });
 
  afterEach(function () {
    sinon.restore();
  });
});
