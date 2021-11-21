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
    },
    likes: {
        type: Number,
        default: 0
    }
}, { collection: "Publicaciones", timestamps: true, versionKey: false });

// Los campos a mostrar
//BORRAR ; ya que _id y idUsuario se sobreentinde que sera el que la esta solicitando
PublicacionSchema.methods.publicData = function () {
    return {
        id: this.id,
        idUsuario: this.idUsuario,
        imagen: this.imagen,
        descripcion: this.descripcion,
        likes: this.likes
    }
};

mongoose.model('Publicacion', PublicacionSchema);
