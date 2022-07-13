const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTACION RUTAS
const usuarioRu = require('./src/routes/Usuario.routes');
const hotelRu = require('./src/routes/Hoteles.routes');
const eventoRu = require('./src/routes/Evento.routes');
const serviciosRu = require('./src/routes/Servicio.routes');
const reservacionRu = require('./src/routes/Reservaciones.routes');


// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', usuarioRu, hotelRu, eventoRu, serviciosRu, reservacionRu );

module.exports = app;