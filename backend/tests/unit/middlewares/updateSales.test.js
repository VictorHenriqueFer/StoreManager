const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const middleware = require('../../../src/middlewares');
const { salesModel } = require('../../../src/models');

describe('Testa o middleware de update', function () {
  it('Testa se não é possivel fazer a requisição com id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const req = { body: { quantity: 5 }, params: { id: 4, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateUpdateSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se não é possivel fazer uma requisição sem o campo quantity', async function () {
    sinon.stub(salesModel, 'findById').resolves([{
      id: 1,
      productId: 1,
      quantity: 5,
    }]);
    const req = { body: { }, params: { id: 4, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateUpdateSales(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Testa se não é possivel fazer uma requisição com o campo quantity menor que 1', async function () {
    sinon.stub(salesModel, 'findById').resolves([{
      id: 1,
      productId: 1,
      quantity: 5,
    }]);
    const req = { body: { quantity: 0 }, params: { id: 1, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateUpdateSales(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  it('Testa se não existe o produto na venda', async function () {
    sinon.stub(salesModel, 'findById').resolves([{
      id: 1,
      productId: 1,
      quantity: 5,
    }]);
    const req = { body: { quantity: 5 }, params: { id: 1, productId: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateUpdateSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });
  it('Testa se passou todas as validações', async function () {
    sinon.stub(salesModel, 'findById').resolves([{
      id: 1,
      productId: 1,
      quantity: 5,
    }]);
    const req = { body: { quantity: 5 }, params: { id: 1, productId: 1 } };
    const res = { };
    const next = sinon.stub().returns();
    await middleware.validateUpdateSales(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});