const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const salesModel = require('../../../src/models/sales');
const salesController = require('../../../src/controllers/sales');

const sale = require('../mocks/sales.js');

describe('Testa controller de vendas', () => {
  afterEach(sinon.restore);

  describe('Testa o método makeSale', () => {
    it('Retorna um array de venda', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(sale.saleReturn);
      sinon.stub(salesModel, 'makeSale').resolves([sale.saleReturn]);
      const result = await salesController.makeSale(req, res);
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(sale.saleReturn);
    });
  });

  describe('Testa o método getAllSales', () => {
    it('Retorna um array de produtos', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([sale.sales])
      const result = await salesController.getAllSales(req, res);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([sale.sales]);
    });
  });

  describe('Testa o método getSaleById', () => {
    it('Retorna um produto específico', async () => {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(sale.saleID);
      sinon.stub(salesModel, 'getSaleById').resolves(sale.saleID);
      const result = await salesController.getSaleById(req, res);
      expect(result).to.deep.equal(sale.saleID);
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
      const result = await salesController.getSaleById(req, res);
      expect(result).to.deep.equal(null);
    });
  });
});


