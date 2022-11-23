const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products');
const productsService = require('../../../src/services/products');

const connection = require('../../../src/models/connection');
const { products, individualProduct} = require('../mocks/products');

describe('Testa model de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método getAll', () => {
    it('Retorna um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(products);
    });
  });

  describe('Testa o método getById', () => {
    it('Retorna um produto específico', async () => {
    sinon.stub(productsModel, 'getById').resolves(individualProduct);
    const result = await productsService.getById(1);
    expect(result.message).to.deep.equal(individualProduct);
    });
  });

  describe('Testa o método create', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsModel, 'create').resolves(individualProduct);
      const result = await productsService.create('Martelo de Thor');
      expect(result.message).to.deep.equal(individualProduct);
    });
  });
});
