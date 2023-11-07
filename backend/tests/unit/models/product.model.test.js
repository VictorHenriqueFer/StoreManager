const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const {
  productsFromModel,
  productsFromId,
} = require('../../mocks/product.mock');
const connection = require('../../../src/models/connection');

describe('Testa o model de produtos', function () {
  it('Testa se o model de produtos retorna um array', async function () {
    sinon.stub(connection, 'execute')
      .resolves(productsFromModel);
    
    const products = await productsModel.getAll();
    
    expect(products).to.be.an('array');
  });
  it('Testa se a requisicao do model de produtos retorna um objeto', async function () {
    sinon.stub(connection, 'execute')
      .resolves(productsFromId);
    
    const products = await productsModel.findById(1);
    
    expect(products).to.be.an('object');
  });
  it('Testa se a requisicao do model de produtos retorna um objeto com as chaves corretas', async function () {
    sinon.stub(connection, 'execute')
      .resolves(productsFromId);
    
    const products = await productsModel.findById(1);
 
    expect(products).to.have.all.keys('id', 'name');
  });
  it('Testa se o retorno da requisição de todos os produtos está correta', async function () {
    sinon.stub(connection, 'execute')
      .resolves(productsFromModel);

    const products = await productsModel.getAll();

    expect(products).to.be.deep.equal(productsFromModel[0]);
  });
  it('Testa se o retorno da requisição de um produto está correta', async function () {
    sinon.stub(connection, 'execute')
      .resolves(productsFromId);

    const products = await productsModel.findById(1);

    expect(products).to.be.deep.equal(productsFromId[0][0]);
  });
  it('Testa se o retorno da inserção de um produto está correta', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const products = await productsModel.insertProduct('teste');

    expect(products).to.be.deep.equal({ id: 1, name: 'teste' });
  });
  it('Testa se o retorno da atualização de um produto está correta', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const products = await productsModel.updateProduct(1, 'teste');

    expect(products).to.be.deep.equal({ id: 1, name: 'teste' });
  });
  it('Testa o delete de um produto está correto', async function () {
    sinon.stub(connection, 'execute')
      .resolves([{ insertId: 1 }]);

    const products = await productsModel.deleteProduct(1);

    expect(products).to.be.deep.equal({ id: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });
});