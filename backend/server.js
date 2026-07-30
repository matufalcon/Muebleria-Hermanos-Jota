require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connect } = require('./src/persistencia/mongo');
const authRouter = require('./src/routes/authRoutes');
const productosRouter = require('./src/routes/productosRoutes');
const logger = require('./src/middlewares/logger');

const app = express();

// CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://muebleria-hermanos-jota-api.vercel.app' 
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Ruta de prueba (health)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor funcionando correctamente.' });
});

// Rutas principales
app.use('/api/auth', authRouter);
app.use('/api/productos', productosRouter);

// Error 404 (ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada.',
    path: req.originalUrl,
    metodo: req.method
  });
});

// Manejador de errores generales
app.use((err, req, res, next) => {
  console.error('Error general:', err.stack || err);
  res.status(500).json({ message: 'Error interno del servidor.' });
});

const PORT = process.env.PORT || 5000;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo conectar a MongoDB:', err);
    process.exit(1);
  });