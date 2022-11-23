const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales');
const salesModel = require('../../../src/models/sales');

const { saleArray, saleReturn } = require('../mocks/sales');

describe('Testa service de vendas', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método makeSale', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(salesModel, 'makeSale').resolves(saleReturn);
      const result = await salesService.makeSale(saleArray);
      expect(result.message).to.deep.equal(saleReturn);
    });
  });
});
