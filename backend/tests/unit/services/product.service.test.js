const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsFromService, productsFromServiceId, productsFromServiceInsert } = require('../../mocks/product.mock');
const { productsModel } = require('../../../src/models');

describe('Testa o service de produtos', function () {
  it('Testa se o service de produtos retorna o objeto correto', async function () {
    sinon.stub(productsModel, 'getAll')
      .resolves(productsFromService);

    const products = await productsServices.getAll();

    expect(products.data).to.be.equal(productsFromService);
  });
  it('Testa se o retorno da função findById está correto', async function () {
    sinon.stub(productsModel, 'findById')
      .resolves(productsFromServiceId);

    const products = await productsServices.findById(1);

    expect(products.data).to.be.equal(productsFromServiceId);
  });
  it('Testa se o retorno da função insertProduct está correto', async function () {
    sinon.stub(productsModel, 'insertProduct')
      .resolves(productsFromServiceInsert);

    const products = await productsServices.insertProduct();

    expect(products.data).to.be.equal(productsFromServiceInsert);
  });
  it('Testa se o retorno do status code da getAll está correto', async function () {
    sinon.stub(productsModel, 'getAll')
      .resolves({ status: 200 });

    const products = await productsServices.getAll();

    expect(products.data).to.be.deep.equal({ status: 200 });
  });
  it('Testa se o retorno do status code da findById está correto', async function () {
    sinon.stub(productsModel, 'findById')
      .resolves({ status: 200 });

    const products = await productsServices.findById(1);

    expect(products.data).to.be.deep.equal({ status: 200 });
  });
  it('Testa se o retorno do status code da insertProduct está correto', async function () {
    sinon.stub(productsModel, 'insertProduct')
      .resolves({ status: 201 });
    
    const products = await productsServices.insertProduct('teste');
    
    expect(products.data).to.be.deep.equal({ status: 201 });
  });

  afterEach(function () {
    sinon.restore();
  });
});