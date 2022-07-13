const Reservacion = require('../models/Reservacion.model');

function agregarReservacion(req, res) {
    var parametros = req.body;
    var user= req.user;
    var reservacionModel = new Reservacion();

    

    if(parametros.NombreReservacion){
        reservacionModel.FechaInicio = parametros.FechaInicio;
        reservacionModel.FechaSalida = parametros.FechaSalida;
        reservacionModel.NombreReservacion = parametros.NombreReservacion;
        reservacionModel.idRes = user.sub;
        reservacionModel.idHabitacion = parametros.idHabitacion;
        reservacionModel.idHotel = parametros.idHotel;
        
        reservacionModel.save((err, reservacionGuardada)=>{
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion Reservacion' });
            if(!reservacionGuardada) return res.status(500).send({ mensaje: 'Error al guardar la Reservacion' });

            return res.status(200).send({ reservacionGuardada });
        })
    }else{
        res.status(500).send({
            mensaje: 'Debe ingresa el Nombre de la Reservacion'});
    }
}

function editarReservacion(req, res) {
    var idReservacion = req.params.idReservacion;
    var parametros = req.body;

    Reservacion.findByIdAndUpdate(idReservacion, parametros, { new: true }, (err, reservacionActualizada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion Reservacion' });
        if(!reservacionActualizada) return res.status(500).send({ mensaje: 'La Reservacion no se ha Actualizo' });
        return res.status(200).send({ reservacionActualizada });
    })  
}

function eliminarReservacion(req, res) {
    const idReservacion = req.params.idReservacion;

    Reservacion.findByIdAndDelete(idReservacion, (err, reservacionEliminada)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if(!reservacionEliminada) return res.status(500).send({ mensaje: 'Error al eliminar la reservacion.' });

        return res.status(200).send({ reservacionEliminada });
    })
}

function visualizarReservaciones(req, res) {
    
    Reservacion.find({}, (err, reservacionEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!reservacionEncontrada) return res.status(500).send({ mensaje: 'Error al buscar los hoteles' })

        return res.status(200).send({ Reservacion: reservacionEncontrada })
    })
}

function ObtenerReservacionId (req, res) {
    const idReservacion = req.params.idReservacion;
    Reservacion.findById(idReservacion, (err, reservacionlEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!reservacionlEncontrado) return res.status(500).send({ mensaje: 'Error al obtener la Empresa'});

        return res.status(200).send({ Reservacion: reservacionlEncontrado })
    })
    
}

module.exports = {
    agregarReservacion,
    editarReservacion,
    eliminarReservacion,
    visualizarReservaciones,
    ObtenerReservacionId
}