const mongoose = require('mongoose');

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
}, {collection: "Publicaciones", timestamps: true});

PublicacionSchema.methods.publicData = () => {
    return {
        idUsuario: this.idUsuario,
        imagen: this.imagen,
        descripcion: this.descripcion
    };
};

mongoose.model('Publicacion', PublicacionSchema);