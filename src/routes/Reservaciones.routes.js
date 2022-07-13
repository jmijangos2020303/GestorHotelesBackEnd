const express = require("express");
const reservacionControlador = require("../controllers/Reservacion.controller");
const md_autenticacion = require("../middlewares/autenticacion");
const md_rol = require("../middlewares/validacion");


const api = express.Router();

api.post('/agregarReservacion', [md_autenticacion.Auth, md_rol.verCliente], reservacionControlador.agregarReservacion);
api.put('/editarReservacion/:idReservacion', [md_autenticacion.Auth, md_rol.verCliente], reservacionControlador.editarReservacion);
api.delete('/eliminarReservacion/:idReservacion',[md_autenticacion.Auth, md_rol.verCliente], reservacionControlador.eliminarReservacion);

/*------------------ BUSQUEDAS ----------------------*/
api.get('/verReservaciones', reservacionControlador.visualizarReservaciones);
api.get('/obtenerReservacion/:idReservacion', reservacionControlador.ObtenerReservacionId)



module.exports = api;