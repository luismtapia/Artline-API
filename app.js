// Express
const express = require('express');
const app = express();

// BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://db_artline:dbuserbedu@bedue10artline.hhsqn.mongodb.net/artline?retryWrites=true&w=majority");
mongoose.set('debug', true);

// Importar Modelos - Esquemas
require('./models/Usuario');
require('./models/Publicacion');
require('./models/Comentario');
require('./config/passport');

// Configuración de Rutas
app.use('/Artline', require('./routes'));

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});