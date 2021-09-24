const mongoose = require('mongoose');
// Esquema de Publicacion: ligada a un usuario quien la realiza, una imagen y una descripcion que acompaña
const PublicacionSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    },
    imagen: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    }
}, {collection: "Publicaciones", timestamps: true, versionKey: false});

// Los campos a mostrar seran imagen y descripcion; ya que _id y idUsuario se sobreentinde que sera el que la esta solicitando
PublicacionSchema.methods.publicData = function () {
    return {
        id: this.id,
        imagen: this.imagen,
        descripcion: this.descripcion
    }
};

mongoose.model('Publicacion', PublicacionSchema);