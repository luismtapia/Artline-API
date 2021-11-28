// require('dotenv').config();
// Express
const express = require('express');
const app = express();
const cors = require('cors');

// BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configuración de Mongoose
const mongoose = require('mongoose');

/* mongoose.connect(process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
); */
mongoose.connect("mongodb+srv://db_artline:dbuserbedu@bedue10artline.hhsqn.mongodb.net/artline"
);
mongoose.set('debug', true);

// Importar Modelos - Esquemas
require('./models/Usuario');
require('./models/Publicacion');
require('./models/Comentario');
require('./config/passport');

// Configuración de Rutas
app.use('/Artline', require('./routes'));


/* app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
}); */
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});