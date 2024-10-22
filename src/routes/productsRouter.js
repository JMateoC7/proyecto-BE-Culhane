const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/ProductManager');
const productManager = new ProductManager('./data/products.json');

// Lista todos los productos
router.get('/', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.json(products);
});

// Obtener producto por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});
// s

// Agregar nuevo producto
router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// Actualizar producto por ID
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
  if (!updatedProduct) return res.status(404).send('Producto no encontrado');
  res.json(updatedProduct);
});

// Eliminar producto por ID
router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(req.params.pid);
  if (!deleted) return res.status(404).send('Producto no encontrado');
  res.status(204).send();
});

module.exports = router;
