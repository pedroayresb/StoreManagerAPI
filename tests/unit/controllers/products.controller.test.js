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

  describe('Recebe os produtos', async () => { 
    it('Retorna um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([products.products]);
      const { body, status } = await chai.request(app).get('/products');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.deep.equal(products.products);
    });
    it('Recebe produto por id', async () => {
      sinon.stub(connection, 'execute').resolves(products.products[0]);
      const { body, status } = await chai.request(app).get('/products/1');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.deep.equal(products.products[0]);
    });
    it('Recebe erro quando o produto não existe', async () => {
      sinon.stub(connection, 'execute').resolves({ type: 'notFound', message: 'Product not found' });
      const { body, status } = await chai.request(app).get('/products/1');
      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.deep.equal({ message: 'Product not found' });
    });
    it('Adiciona item a lista', async () => { 
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 5 }])
        .onSecondCall().resolves({ type: null, message: products.products[0] });
      
      chai.request(app).post('/products').send({ name: 'Martelo de Thor' });
     });
  });
});

