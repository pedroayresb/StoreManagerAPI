const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);
const app = require('../../../src/app');

const productsController = require('../../../src/controllers/products');
const productsService = require('../../../src/services/products');

const connection = require('../../../src/models/connection');
const products = require('../mocks/products');

describe('Testa controller de produtos', () => {
  afterEach(() => sinon.restore());

  describe('Testa o endpoint GET /products', () => {
    it('Retorna um array de produtos', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([products.products]);
      const response = await chai.request(app).get('/products');
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.deep.equal(products.products);
      expect(stub).to.have.been.calledOnce;
    });
  });
    
  describe('Testa o endpoint GET /products/:id', () => {
    it('Retorna um produto específico', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([[products.products[0]]]);
      const response = await chai.request(app).get('/products/1');
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal(products.products[0]);
      expect(stub).to.have.been.calledOnce;
    });
    
    it('Retorna um erro quando o produto não existe', async () => {
      const stub = sinon.stub(connection, 'execute').resolves([[]]);
      const response = await chai.request(app).get('/products/1');
      expect(response).to.have.status(404);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal({ message: 'Product not found' });
      expect(stub).to.have.been.calledOnce;
    });
  });
});

