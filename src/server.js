const app = require('./app');
require('dotenv').config();

const productsRouter = require('./routes/products');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/products', productsRouter);
