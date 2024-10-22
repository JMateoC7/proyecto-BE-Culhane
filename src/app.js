const express = require('express');
const productRoutes = require('./routes/productsRouter');
const cartRoutes = require('./routes/cartRouter');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

module.exports = app;
