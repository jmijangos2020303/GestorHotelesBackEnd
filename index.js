const mongoose = require('mongoose');
const app = require('./app');

const control = require("./src/controllers/Usuario.controller")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Hoteles', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Se ha conectado correctamente a la base de datos.');

    control.RegistrarAd();

    app.listen(3000, function (){
        console.log("Hoteles, esta corriendo correctamente en el puerto 3000");
    });

}).catch(error => console.log(error));
