const app = require('./app.js'); // Importa la configuración del servidor
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
