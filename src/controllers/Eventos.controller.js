const Evento = require('../models/Evento.model');


function agregarEvento(req, res) {
    var params = req.body;
    var eventoModel = new Evento();

    if(params.nombre && params.descripcion){
        eventoModel.idHotel = params.idHotel;
        eventoModel.nombre = params.nombre;
        eventoModel.descripcion = params.descripcion;
        eventoModel.fechaInicio = params.fechaInicio;
        eventoModel.fechaFinal = params.fechaFinal;
        
        eventoModel.save((err, eventoGuardado)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion del evento' });
            if(!eventoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el evento' });

            return res.status(200).send({ eventoGuardado });
        })
    }else{
        res.status(500).send({
            mensaje: 'Le faltan Datos para poder agregar el Evento!!'
        });
    }
}

function editarEvento(req, res) {
    var idEvento = req.params.idEvento;
    var params = req.body;

    Evento.findByIdAndUpdate(idEvento, params, { new: true }, (err, eventoActualizado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!eventoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el evento' });
        return res.status(200).send({ eventoActualizado });
    })  
}

function eliminarEvento(req, res) {
    const idEvento = req.params.idEvento;

    Evento.findByIdAndDelete(idEvento, (err, eventoEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!eventoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el evento.' });

        return res.status(200).send({ eventoEliminado });
    })
}

function obtenerEventos(req, res) {
    Evento.find().populate('idHot', 'nombre').exec((err, eventosEncontrados)=>{console.log(err);
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de eventos' });
        if(!eventosEncontrados) return res.status(500).send({ mensaje: 'Error al obtener los eventos' });
        return res.status(200).send({ eventosEncontrados });
    })
}


function obtenerEventoXiD(req, res) {
    const idEvento = req.params.idEvento;

    Evento.findById(idEvento, (err, eventoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Evento' })
        if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Evento' })
        console.log(eventoEncontrado.nombre);
        return res.status(200).send({ eventoEncontrado })
    })
}


module.exports = {
    agregarEvento,
    editarEvento,
    eliminarEvento,
    obtenerEventos,
    obtenerEventoXiD
}
