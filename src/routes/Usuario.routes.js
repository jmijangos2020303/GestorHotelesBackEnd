const express = require('express');
const controladorUsuario = require('../controllers/Usuario.controller');

const md_aut = require('../middlewares/autenticacion');

const api = express.Router();


api.post('/registrarAdminHotel', controladorUsuario.RegistraAdmin);

api.post('/registrar', controladorUsuario.RegistrarUsuario);
api.post('/login', controladorUsuario.Login);
api.get('/verPerfil',md_aut.Auth , controladorUsuario.VerPerfil);
api.put('/EditarPerfil/:idUsuario', md_aut.Auth, controladorUsuario.EditarPerfil);




module.exports = api;