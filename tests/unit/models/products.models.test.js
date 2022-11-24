const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products');
const productsService = require('../../../src/services/products');

const { products, individualProduct} = require('../mocks/products');


describe('Testa o model de produtos', () => {
  describe('Testa o método getAllProducts', () => {
    it('Retorna um array de produtos', async () => {
      sinon.stub(productsModel, 'getAll').resolves(products);
      const result = await productsModel.getAll();
      expect(result).to.be.an('array'); 
      expect(result).to.deep.equal(products);
    });
  });

  describe('Testa o método getProductById', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsModel, 'getById').resolves(individualProduct);
      const result = await productsModel.getById(1);
      expect(result).to.deep.equal(individualProduct);
    });
  });

  describe('Testa o método createProduct', () => {
    it('Retorna um produto criado', async () => {
      sinon.stub(productsModel, 'create').resolves(individualProduct);
      const result = await productsModel.create(individualProduct);
      expect(result).to.deep.equal(individualProduct);
    });
  });

  describe('Testa o método updateProduct', () => {
    it('Retorna um produto atualizado', async () => {
      sinon.stub(productsModel, 'update').resolves(individualProduct);
      const result = await productsModel.update(1, individualProduct);
      expect(result).to.deep.equal(individualProduct);
    });
  });

  describe('Testa o método deleteProduct', () => {
    it('Retorna um produto deletado', async () => {
      sinon.stub(productsModel, 'exclude').resolves(204);
      const result = await productsModel.exclude(1);
      expect(result).to.deep.equal(204);
    });
  });
});


