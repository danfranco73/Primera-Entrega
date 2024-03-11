import express from 'express';
import __dirname from './utils.js';
import productsRouter from './src/routes/productsRouter.js';
import cartsRouter from './src/routes/cartsRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}
);

export default app;