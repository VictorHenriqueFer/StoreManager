const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const middleware = require('../../../src/middlewares');

const { productsModel } = require('../../../src/models');
const productsMock = require('../../mocks/product.mock');

describe('Testa as validações das requisição', function () {
  it('Testa se não é possivel cadastrar uma venda sem o produto', async function () {
    const req = { body: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateSales(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('Testa se não é possivel cadastrar uma venda sem a quantidade', async function () {
    const req = { body: [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateSales(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Testa se a quantidade é menor que 1', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateSales(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  it('Testa se não é possivel cadastrar uma venda com o produto não cadastrado', async function () {
    sinon.stub(productsModel, 'getAll')
      .resolves(
        productsMock.productsFromServiceUpdate,

      );
      
    const req = { body: [{ productId: 3, quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateSalesProducts(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Testa se passou todas as validações', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = { };
    const next = sinon.stub().returns(); 

    await middleware.validateSales(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});
