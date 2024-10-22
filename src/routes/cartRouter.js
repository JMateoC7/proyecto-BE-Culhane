const express = require('express');
const router = express.Router();
const CartManager = require('../dao/CartManager');
const cartManager = new CartManager('./data/carts.json');

// Crear nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Listar productos de un carrito por ID
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.json(cart);
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  if (!updatedCart) return res.status(404).send('Carrito o producto no encontrado');
  res.json(updatedCart);
});

module.exports = router;
