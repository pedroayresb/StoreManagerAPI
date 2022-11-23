const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const individualProduct = {
  "id": 1,
  "name": "Martelo de Thor"
}

const productsAll = {
  type: null,
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ]
}

const productsIdForService = { type: null, message: { id: 1, name: 'Martelo de Thor' } }

const msgError = { type: 'NOT_FOUND', message: 'Product not found' }

module.exports = {
  products,
  individualProduct,
  productsAll,
  productsIdForService,
  msgError,
}