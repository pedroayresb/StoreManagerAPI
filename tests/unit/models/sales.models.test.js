const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales');
const salesService = require('../../../src/services/sales');

const connection = require('../../../src/models/connection');

const { saleArray, saleReturn, allSales } = require('../mocks/sales');

describe('Testa model de vendas', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método makeSale', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(salesModel, 'makeSale').resolves(saleReturn);
      const result = await salesService.makeSale(saleArray);
      expect(result.message).to.deep.equal(saleReturn);
    });
  });

  describe('Testa o método getAllSales', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);
      const result = await salesService.getAllSales();
      expect(result).to.deep.equal(allSales);
    });
  });

  describe('Testa o método getSaleById', () => {
    it('Retorna uma venda', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(allSales[0]);
      const result = await salesService.getSaleById(1);
      expect(result).to.deep.equal(allSales[0]);
    });
    it('Retorna um erro 404 quando a venda não existe', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const result = await salesService.getSaleById(2);
      expect(result).to.deep.equal(undefined);
    });
  });
});
