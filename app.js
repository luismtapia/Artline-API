const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuracion a base de datos
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://db_artline:dbuserbedu@bedue10artline.hhsqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.set("debug", true);

//importar los Schemas
require('./models/Publicacion');
require('./models/Comentario');

//Configuración de Rutas
app.use('/Artline', require('./routes'));

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});