// creo el router para las vistas
import express from 'express';

const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
  res.render('main');
}   );

viewsRouter.get('/products', (req, res) => {
  res.render('products');
}  );

viewsRouter.get('/productDetail', (req, res) => {
  res.render('productDetail');
} );

viewsRouter.get('/productEdit', (req, res) => {
  res.render('productEdit');
} );

viewsRouter.get('/productAdd', (req, res) => {
  res.render('productAdd');
} );

viewsRouter.get('/productCart', (req, res) => {
  res.render('productCart');
} );

export default viewsRouter;