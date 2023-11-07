const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const middleware = require('../../../src/middlewares');

describe('Testa as validações das requisição', function () {
  it('Testa se não é possivel cadastrar um produto sem o nome', async function () {
    const req = { body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateProducts(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Testa se não é possivel alterar um produto com o nome menor que 5 caracteres', async function () {
    const req = { body: { name: 'Test' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(),
    };
    await middleware.validateProducts(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.deep.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  it('Testa se passou todas as validações', async function () {
    const req = { body: { name: 'Testee' } };
    const res = { };
    const next = sinon.stub().returns(); 

    await middleware.validateProducts(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  afterEach(function () {
    sinon.restore();
  });
});
