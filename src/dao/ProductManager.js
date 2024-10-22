// src/dao/ProductDAO.js
const fs = require('fs').promises;
const path = require('path');

class ProductDAO {
  constructor() {
    this.filePath = path.join(__dirname, '../data/products.json'); // Asegúrate de que la ruta sea correcta
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data); // Devuelve la lista de productos
    } catch (error) {
      console.error('Error al leer los productos:', error);
      throw error; // Lanza el error para que sea manejado por el controlador
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getAllProducts(); // Obtiene productos existentes
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1; // Genera un nuevo ID
      const newProduct = { id: newId, ...product }; // Crea el nuevo producto
      products.push(newProduct); // Agrega el nuevo producto al array
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2)); // Guarda los productos actualizados
      return newProduct; // Devuelve el nuevo producto
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      throw error;
    }
  }

  async updateProduct(pid, updatedFields) {
    try {
      const products = await this.getAllProducts(); // Obtiene productos existentes
      const productIndex = products.findIndex(p => p.id === pid); // Busca el índice del producto
      if (productIndex === -1) throw new Error('Producto no encontrado');

      // Actualiza solo los campos que se han proporcionado
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct; // Reemplaza el producto actualizado
      await fs.writeFile(this.filePath, JSON.stringify(products, null, 2)); // Guarda los productos actualizados
      return updatedProduct; // Devuelve el producto actualizado
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  }

  async deleteProduct(pid) {
    try {
      const products = await this.getAllProducts(); // Obtiene productos existentes
      const updatedProducts = products.filter(p => p.id !== pid); // Filtra el producto a eliminar
      await fs.writeFile(this.filePath, JSON.stringify(updatedProducts, null, 2)); // Guarda los productos actualizados
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
}

module.exports = ProductDAO;
