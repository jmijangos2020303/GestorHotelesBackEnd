const express = require('express');
const controladorHotel = require('../controllers/Hoteles.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');

const api = express.Router();


api.post('/registrarHotel', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorHotel.RegistrarHotel);
api.put('/editarHotel/:idHotel', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorHotel.EditarHotel);
api.get('/verHoteles',controladorHotel.visualizarHoteles);
api.delete('/eliminarHotel/:idHotel', [md_autenticacion.Auth, md_autRol.verAdHotel ], controladorHotel.EliminarHotel);
api.get('/obtenerHotel/:idHotel', controladorHotel.ObtenerHotelId)


module.exports = api;
