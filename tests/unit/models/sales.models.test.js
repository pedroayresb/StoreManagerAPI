const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales');
const salesService = require('../../../src/services/sales');

const connection = require('../../../src/models/connection');

const { saleArray, saleReturn } = require('../mocks/sales');

describe('Testa model de vendas', () => {
  afterEach(() => sinon.restore());

  describe('Testa o método makeSale', () => {
    it('Retorna um array de vendas', async () => {
      sinon.stub(salesModel, 'makeSale').resolves(saleReturn);
      const result = await salesService.makeSale(saleArray);
      expect(result.message).to.deep.equal(saleReturn);
    });
  });
});
