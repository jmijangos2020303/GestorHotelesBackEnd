const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function RegistrarAd(req, res) {

    let usuarioModelo = new Usuario();

    usuarioModelo.nombre='SuperAdmin';
    usuarioModelo.email = 'Superadmin';
    usuarioModelo.rol = 'ADMIN';
    usuarioModelo.password = '123456'

    Usuario.find({$or:[
        {usuario: usuarioModelo.usuario}
    ]}).exec((err, buscarUsuario)=>{
        if(err) return console.log("ERROR en la peticion")
        
        if(buscarUsuario && buscarUsuario.length>=1){
            console.log("Usuario Super Admin creado con anterioridad")
        }else{
            bcrypt.hash(usuarioModelo.password,null,null, (err, passCrypt)=>{
                usuarioModelo.password = passCrypt;
            })

            usuarioModelo.save((err,usuarioGuardado)=>{
                if(err) return console.log( "ERROR al crear el usuario Admin" )

                if(usuarioGuardado){
                    console.log( "Usuario Super Admin Creado" )
                }
            })
        }
    })
}

//Cread Admin de Hotel
function RegistraAdmin(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.usuario &&parametros.nombre && parametros.apellido &&   
        parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.telefono = parametros.telefono;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'HOTEL';
            

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }
}




//General y Usuario

function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        if(parametros.obtenerToken == 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;

                            return res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }                       
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}


function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.nombre &&  
        parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.email = parametros.email;
            usuarioModel.telefono = parametros.telefono;
            usuarioModel.direccion = parametros.direccion;
            
            usuarioModel.rol = 'CLIENTE';

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}

function EditarPerfil(req, res) {
    var logeado = req.user;
   
    var parametros = req.body;
    
    delete parametros.password
    delete parametros.rol
   
    Usuario.findByIdAndUpdate(logeado.sub, parametros, { new : true } ,(err, usuarioEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el registro del Usuario' });

        return res.status(200).send({ usuario: usuarioEditado});
    })
}

function VerPerfil(req, res) {
    var logeado = req.user;
       
    Usuario.find({_id:logeado.sub},(err, usuarioEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEditado) return res.status(404)
            .send({ mensaje: 'Error al encontrar el perfil del Usuario' });

        return res.status(200).send({ usuario: usuarioEditado});
    })
}



module.exports = {
    RegistrarAd,
    RegistraAdmin,
    RegistrarUsuario,
    Login,
    VerPerfil,
    EditarPerfil
}