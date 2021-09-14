const mongoose = require('mongoose');

const PublicacionSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    imagen: {
        type: String,
        require: true
    },
    comentarios: {
        type: String
    },
    likes: {
        type: Int32Array
    }
}, {collection: "Publicaciones", timestamps: true});

PublicacionSchema.methods.publicData = () => {
    return {
        idUsuario: this.idUsuario,
        imagen: this.imagen,
        comentarios: this.comentarios,
        likes: this.likes
    };
};

mongoose.model('Mascota', PublicacionSchema);