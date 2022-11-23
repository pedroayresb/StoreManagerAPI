const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products');
const productsModel = require('../../../src/models/products');

const products = require('../mocks/products');

describe('Testa service de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método getAll', () => {
    it('Retorna um array de produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(products.products);
      const response = await productsService.getAll();
      expect(response.message).to.be.an('array');
      expect(response.message).to.deep.equal(products.products);
    });
  });

  describe('Testa o método getById', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsModel, 'getById').resolves(products.products[0]);
      const response = await productsService.getById(1);
      expect(response.message).to.be.an('object');
      expect(response.message).to.deep.equal(products.products[0]);
    });

    it('Retorna um erro quando o produto não existe', async () => {
      sinon.stub(productsModel, 'getById').resolves(null);
      const response = await productsService.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.deep.equal({ type: 'notFound', message: 'Product not found' });
    });
  });

  describe('Testa o método create', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsModel, 'create').resolves({ id: 1, name: 'Produto 1' });
      const response = await productsService.create('Produto 1');
      expect(response.message).to.be.an('object');
      expect(response.message).to.deep.equal({ id: 1, name: 'Produto 1' });
    });
  });
});