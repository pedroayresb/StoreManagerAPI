const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products');

const connection = require('../../../src/models/connection');
const products = require('../mocks/products');

describe('Testa model de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método getAll', () => {
    it('Retorna um array de produtos', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([products.products]);
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.deep.equal(products.products);
      expect(stub).to.have.been.calledOnce;
    });
  });

  describe('Testa o método getById', () => {
    it('Retorna um produto específico', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([[products.products[0]]]);
      const response = await productsModel.getById(1);
      expect(response).to.be.an('object');
      expect(response).to.deep.equal(products.products[0]);
      expect(stub).to.have.been.calledOnce;
    });

    it('Retorna um erro quando o produto não existe', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([[]]);
      const response = await productsModel.getById(1);
      expect(response).to.be.an('undefined');
      expect(stub).to.have.been.calledOnce;
    });
  });
});
