const Habitacion = require('../models/Habitaciones.model');
const Hotel = require('../models/Hoteles.model');


function RegistrarHabitacion(req, res) {
    var parametros = req.body;
    var user= req.user;
    var hat = new Habitacion()

    if(parametros.nombre ) {
            hat.No_Habit = parametros.habitacion;
            hat.Descripcion = parametros.descripcion;
            hat.Disponibilidad = parametros.isponibilidad;
           
            Hotel.findOne({idProp :user.sub}, (err,EmprEnc)=>{
                if(err) return res.status(500).send({mensaje:'no tiene una empresa Creada'})
                if(!EmprEnc) return res.status(500).send({mensaje:'no existe una empresa'})
            })

            hat.idHot = EmprEnc._id;

            Habitacion.find({ No_Habit : parametros.habitacion }, (err, catEncontrado) => {
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



function ObtenerHabId (req, res) {
    const idHab = req.params.idHab;
    Habitacion.findById(idHab, (err, hotelEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!hotelEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la Empresa'});

        return res.status(200).send({ Habitaciones: hotelEncontrado })
    })
    
}


function EditarHabitacion(req, res) {
    const idHab = req.params.idHab;
    var parametros = req.body;
    var logeado = req.user;

    Hotel.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})

        Habitacion.findByIdAndUpdate(idHab, parametros, { new : true } ,(err, hatEditado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if(!hatEditado) return res.status(404)
                .send({ mensaje: 'Error al Editar el Hotel' });
    
            return res.status(200).send({ habitacion: hatEditado});
        })

    })
    
}


function EliminarHat(req, res) {
    const idHab = req.params.idHab;
    var logeado = req.user;

    Hotel.find({idProp:logeado.sub}, (err, Empr)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'})
        if(!Empr) return res.status(500).send({mensaje:'Verifica que sea su empresa'})



        Habitacion.findByIdAndDelete(idHab, (err, hotEliminado)=>{
            if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
            if(!hotEliminado) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});
    
            return res.status(200).send({ Empresa_Eliminada: hotEliminado})
        })
    
    })
    
   
}


function visualizarHabitaciones(req, res) {
    
    Habitacion.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })

        return res.status(200).send({ Empresas: catEncontrado })
    })
}


module.exports={
    RegistrarHabitacion,
    EditarHabitacion,
    visualizarHabitaciones,
    EliminarHat,
    ObtenerHabId
    
    }