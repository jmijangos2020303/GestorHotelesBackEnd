const Servicio = require('../models/Servicios.model');

function RegistrarServicio(req, res) {
    var parametros = req.body;
    
    var cat = new Servicio()

    if(parametros.nombre ) {
            cat.nombre = parametros.nombre;
            cat.costo = parametros.precio;
           
            cat.save((err, usuarioGuardado) => {
                if (err) return res.status(500)
                    .send({ mensaje: 'Error en la peticion' });
                if(!usuarioGuardado) return res.status(500)
                    .send({ mensaje: 'Error al agregar el Servicio'});
                
                return res.status(200).send({ Servicios: usuarioGuardado });
            }); 
    }
}



function EditarServicio(req, res) {
    const idServ = req.params.idServices;
    var parametros = req.body;
   

    Servicio.findByIdAndUpdate(idServ, parametros, { new : true } ,(err, hotelEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!hotelEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el Hotel' });

        return res.status(200).send({ hotel: hotelEditado});
    })
    
}


function EliminarServicio(req, res) {
    const idServ = req.params.idServices;
    
    Servicio.findOneAndDelete({_id:idServ, idProp:logeado.sub}, (err, hotEliminado)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
        if(!hotEliminado) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});

        return res.status(200).send({ Empresa_Eliminada: hotEliminado})
    })
}


function visualizarServicios(req, res) {
    
    Servicio.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })

        return res.status(200).send({ Empresas: catEncontrado })
    })
}


module.exports={
    RegistrarServicio,
    EditarServicio,
    EliminarServicio,
    visualizarServicios
    
    }