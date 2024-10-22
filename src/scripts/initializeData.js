// initializeData.js
const fs = require('fs').promises;
const path = require('path');

const products = [
  {
    title: "Camiseta River Plate - Local",
    description: "Camiseta oficial de River Plate, temporada 2024.",
    code: "RIVER-001",
    price: 50.00,
    status: true,
    stock: 100,
    category: "Camisetas",
    thumbnails: ["https://example.com/camiseta1.jpg"],
  },
  {
    title: "Camiseta River Plate - Visitante",
    description: "Camiseta oficial de River Plate, temporada 2024 (visita).",
    code: "RIVER-002",
    price: 55.00,
    status: true,
    stock: 80,
    category: "Camisetas",
    thumbnails: ["https://example.com/camiseta2.jpg"],
  },
  {
    title: "Camiseta River Plate - Alternativa",
    description: "Camiseta alternativa de River Plate, temporada 2024.",
    code: "RIVER-003",
    price: 60.00,
    status: true,
    stock: 50,
    category: "Camisetas",
    thumbnails: ["https://example.com/camiseta3.jpg"],
  },
];

const carts = [
  {
    id: 1,
    products: [
      { product: "RIVER-001", quantity: 1 },
      { product: "RIVER-002", quantity: 2 },
    ],
  },
  {
    id: 2,
    products: [
      { product: "RIVER-003", quantity: 1 },
    ],
  },
];

const initializeData = async () => {
  try {
    // Define las rutas de los archivos
    const productsFilePath = path.join(__dirname, '../data/products.json');
    const cartsFilePath = path.join(__dirname, '../data/carts.json');

    // Escribe los archivos con los datos iniciales
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));

    console.log('Datos inicializados correctamente.');
  } catch (error) {
    console.error('Error al inicializar los datos:', error);
  }
};

initializeData();
