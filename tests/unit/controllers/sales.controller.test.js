const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);
const app = require('../../../src/app');

const salesController = require('../../../src/controllers/sales');

const connection = require('../../../src/models/connection');
const sale = require('../mocks/sales.js');

describe('Testa controller de vendas', () => {
  afterEach(sinon.restore);

  describe('Testa o método makeSale', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(salesController, 'makeSale').resolves(sale.saleReturn);
      const { body, status } = await chai.request(app).post('/sales').send(sale.saleArray);
      expect(body.itemsSold).to.deep.equal(sale.saleReturn.itemsSold);
      expect(status).to.deep.equal(201);
    });
    it('Retorna um erro 400 quando o produto não é enviado', async () => {
      const { body, status } = await chai.request(app).post('/sales').send([{
        quantity: 1,
      }]);
      expect(body.message).to.deep.equal('"productId" is required');
      expect(status).to.deep.equal(400);
    });
  });

  describe('Testa o método getAllSales', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(connection, 'execute').resolves([sale.allSales]);
      const { body, status } = await chai.request(app).get('/sales');
      expect(body).to.deep.equal(sale.allSales);
      expect(status).to.deep.equal(200);
    });
  });

  describe('Testa o método getSaleById', () => {
    it('Retorna uma venda', async () => {
      sinon.stub(connection, 'execute').resolves([sale.saleID]);;
      const { body, status } = await chai.request(app).get('/sales/1');
      expect(body).to.deep.equal(sale.saleID);
      expect(status).to.deep.equal(200);
    });
    it('Retorna um erro 404 quando a venda não existe', async () => {
      sinon.stub(connection, 'execute').resolves([sale.allSales]);
      const { body, status } = await chai.request(app).get('/sales/574836216540376');
      expect(body.message).to.deep.equal('Sale not found');
      expect(status).to.deep.equal(404);
    });
  });
});