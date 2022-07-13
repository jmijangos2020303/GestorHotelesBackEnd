const express = require('express');
const eventoControlador = require("../controllers/Eventos.controller");
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');


const api = express.Router();

api.post('/agregarEvento',[md_autenticacion.Auth,md_autRol.verAdHotel] ,eventoControlador.agregarEvento);
api.put('/editarEvento/:idEvento', [md_autenticacion.Auth,md_autRol.verAdHotel],eventoControlador.editarEvento);
api.delete('/eliminarEvento/:idEvento',[md_autenticacion.Auth,md_autRol.verAdHotel] ,eventoControlador.eliminarEvento);
api.get('/obtenerEventos', eventoControlador.obtenerEventos);
api.get('/obtenerEventoId/:idEvento', eventoControlador.obtenerEventoXiD);



module.exports = api;