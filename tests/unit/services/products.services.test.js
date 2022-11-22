const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products');
const productsModel = require('../../../src/models/products');


const connection = require('../../../src/models/connection');
const products = require('../mocks/products');

describe('Testa service de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método getAll', () => {
    it('Retorna um array de produtos', async () => {
      const stub = sinon.stub(productsModel, 'getAll').resolves(products.products);
      const response = await productsService.getAll();
      expect(response).to.be.an('object');
      expect(response).to.deep.equal({ type: null, message: products.products });
      expect(stub).to.have.been.calledOnce;
    });
  });

  describe('Testa o método getById', () => {
    it('Retorna um produto específico', async () => {
      const stub = sinon.stub(productsModel, 'getById').resolves(products.products[0]);
      const response = await productsService.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.deep.equal({ type: null, message: products.products[0] });
      expect(stub).to.have.been.calledOnce;
    });

    it('Retorna um erro quando o produto não existe', async () => {
      const stub = sinon.stub(productsModel, 'getById').resolves(undefined);
      const response = await productsService.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.deep.equal({ type: 'notFound', message: 'Product not found' });
      expect(stub).to.have.been.calledOnce;
    });
  });
});