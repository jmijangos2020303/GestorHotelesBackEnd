const Hotel = require('../models/Hoteles.model');
//const Habitaciones = require('../models/Habitaciones.model');
//const Evento = require('../models/Evento.model');


function RegistrarHotel(req, res) {
    var parametros = req.body;
    var user= req.user;
    var cat = new Hotel()

    if(parametros.nombre ) {
            cat.Nombre = parametros.nombre;
            cat.Direccion = parametros.direccion;
            cat.Descripcion = parametros.descripcion;
            cat.idProp = user.sub;
            Hotel.find({ nombre : parametros.nombre }, (err, catEncontrado) => {
                if ( catEncontrado.length == 0 ) {

                    cat.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if(!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el Hotel'});
                        
                        return res.status(200).send({ Empresas: usuarioGuardado });
                    });                 
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este hotel ya existe en la base de datos ' });
                }
            })
    }
}



function ObtenerHotelId (req, res) {
    const idHotel = req.params.idHotel;
    Hotel.findById(idHotel, (err, hotelEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!hotelEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la Empresa'});

        return res.status(200).send({ Hotel: hotelEncontrado })
    })
    
}


function EditarHotel(req, res) {
    const idHotel = req.params.idHotel;
    var parametros = req.body;
    var logeado = req.user;

    Hotel.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})

        Hotel.findByIdAndUpdate(idHotel, parametros, { new : true } ,(err, hotelEditado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!hotelEditado) return res.status(404)
                .send({ mensaje: 'Error al Editar el Hotel' });
    
            return res.status(200).send({ hotel: hotelEditado});
        })

    })
    
}


function EliminarHotel(req, res) {
    const idHotel = req.params.idHotel;
    var logeado = req.user;

    Hotel.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})



        Hotel.findOneAndDelete({_id:idHotel, idProp:logeado.sub}, (err, hotEliminado)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
            if(!hotEliminado) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});
    
            return res.status(200).send({ Empresa_Eliminada: hotEliminado})
        })
    
    })
    
   
}


function visualizarHoteles(req, res) {
    
    Hotel.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })

        return res.status(200).send({ Empresas: catEncontrado })
    })
}


module.exports={
    RegistrarHotel,
    EditarHotel,
    visualizarHoteles,
    EliminarHotel,
    ObtenerHotelId
    
    }