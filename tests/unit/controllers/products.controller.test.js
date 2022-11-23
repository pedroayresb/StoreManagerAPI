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

  describe('Testa o método getProducts', () => {
    it('Retorna um array de produtos', async () => {
    sinon.stub(connection, 'execute').resolves([products.products]);
    const { body, status } = await chai.request(app).get('/products');
    expect(body).to.deep.equal(products.products);
    expect(status).to.deep.equal(200);
    });
  });

  describe('Testa o método getProductById', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsController, 'getProductById').resolves(products.individualProduct);
      const { body, status } = await chai.request(app).get('/products/1');
      expect(body).to.deep.equal(products.individualProduct);
      expect(status).to.deep.equal(200);
    });

    it('Retorna um erro 404 quando o produto não existe', async () => {
      sinon.stub(productsController, 'getProductById').resolves(products.error);
      const { body, status } = await chai.request(app).get('/products/7657564');
      expect(body.message).to.deep.equal('Product not found');
      expect(status).to.deep.equal(404);
    });
  });

  describe('Testa o método createProduct', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(productsController, 'createProduct').resolves(products.individualProduct);
      const { body, status } = await chai.request(app).post('/products').send({ name: 'Martelo de Thor' });
      expect(body.name).to.deep.equal(products.individualProduct.name);
      expect(status).to.deep.equal(201);
    });

    it('Retorna um erro 400 quando o produto não é enviado', async () => {
      const { body, status } = await chai.request(app).post('/products').send({});
      expect(body.message).to.deep.equal('"name" is required');
      expect(status).to.deep.equal(400);
    });
  });
});

