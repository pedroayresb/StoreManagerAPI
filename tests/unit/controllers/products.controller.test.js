const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const productsModel = require('../../../src/models/products');
const productsController = require('../../../src/controllers/products');

const product = require('../mocks/products');

describe('Testa controller de products', () => {
  afterEach(sinon.restore);

  describe('Testa o método getAllProducts', () => {
    it('Retorna um array de produtos', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([product.products])
      const result = await productsController.getProducts(req, res);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([product.products]);
    });
  });

  describe('Testa o método getProductById', () => {
    it('Retorna um produto específico', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product.individualProduct);
      sinon.stub(productsModel, 'getById').resolves(product.productsIdForService);
      const result = await productsController.getProductById(req, res);
      expect(result).to.deep.equal(product.individualProduct);
    });

    it('Retorna um erro quando o produto não existe', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null)
      const result = await productsController.getProductById(req, res);
      expect(result).to.deep.equal(null);
    });
  });
  
  describe('Testa o método createProduct', () => {
    it('Retorna um produto criado', async () => {
      const req = {
        body: {
          name: 'Teste',
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product.insertedProduct)
      const result = await productsController.createProduct(req, res);
      expect(result).to.deep.equal(product.insertedProduct);
    });
  });

  describe('Testa o método updateProduct', () => {
    it('Retorna um produto atualizado', async () => {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'Teste2',
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(product.updatedProduct)
      sinon.stub(productsModel, 'update').resolves(product.updatedProduct);
      const result = await productsController.updateProduct(req, res);
      expect(result).to.deep.equal(product.updatedProduct);
    });

    it('Retorna um erro quando o produto não existe', async () => {
      const req = {
        params: {
          id: 432423554,
        },
        body: {
          name: 'Teste2',
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null)
      const result = await productsController.updateProduct(req, res);
      expect(result).to.deep.equal(null);
    });
  });
  
  describe('Testa o método deleteProduct', () => {
    it('Retorna um produto deletado', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
      const result = await productsController.deleteProduct(req, res);
    });

    it('Retorna um erro quando o produto não existe', async () => {
      const req = {
        params: {
          id: 432423554,
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(null)
      const result = await productsController.deleteProduct(req, res);
      expect(result).to.deep.equal(null);
    });
  });   

});