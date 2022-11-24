const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales');

const connection = require('../../../src/models/connection');


const { saleArray, saleReturn, allSales } = require('../mocks/sales');

describe('Testa model de vendas', () => {
  afterEach(sinon.restore);

  describe('Testa o método makeSale', () => {
    it('Retorna um array de venda', async () => {
      sinon.stub(connection, 'execute')
        .onCall(0).resolves([{ insertId: 1 }])
        .onCall(1).resolves([saleReturn]);
      const result = await salesModel.makeSale(saleArray);
      expect(result).to.be.an('object');
      expect(result).to.deep.equal(saleReturn);
    });
  });

  describe('Testa o método getAllSales', () => {
    it('Retorna um array de produtos', async () => {
      sinon.stub(connection, 'execute').resolves([allSales]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([...allSales]);
    });
  });

  describe('Testa o método getSaleById', () => {
    it('Retorna um produto específico', async () => {
      sinon.stub(connection, 'execute').resolves([saleReturn]);
      const result = await salesModel.getSaleById(1);
      expect(result).to.deep.equal(saleReturn);
    });

    it('Retorna um erro quando o produto não existe', async () => {
      sinon.stub(connection, 'execute').resolves([null]);
      const result = await salesModel.getSaleById(1);
      expect(result).to.deep.equal(null);
    });
  });
});
    

    