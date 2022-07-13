const express = require('express');
const controladorHab = require('../controllers/Habitacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');

const api = express.Router();


api.post('/registrarHabitacion', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorHab.RegistrarHabitacion);
api.put('/editarHabitacion/:idHab', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorHab.EditarHabitacion);
api.get('/verHabitacion',controladorHab.visualizarHabitaciones);
api.delete('/eliminarHabitacion/:idHab', [md_autenticacion.Auth, md_autRol.verAdHotel ], controladorHab.EliminarHat);
api.get('/obtenerHotel/:idHab', controladorHab.ObtenerHabId)


module.exports = api;