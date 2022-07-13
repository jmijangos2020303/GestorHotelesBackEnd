const express = require('express');
const controladorServicios = require('../controllers/Servicios.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_autRol = require('../middlewares/validacion');

const api = express.Router();


api.post('/registrarServicio', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorServicios.RegistrarServicio);
api.put('/editarServicio/:idServices', [md_autenticacion.Auth, md_autRol.verAdHotel ],controladorServicios.EditarServicio);
api.get('/verServicios',controladorServicios.visualizarServicios);
api.delete('/eliminarServicio/:idServices', [md_autenticacion.Auth, md_autRol.verAdHotel ], controladorServicios.EliminarServicio);


module.exports = api;