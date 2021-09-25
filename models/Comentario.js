const mongoose = require('mongoose');

// Esquema de comentarios: hecho por un usuario a una determinada publicacion o en replica a algun otro comentario, con opcion de pinear comentarios
const ComentarioSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        require: true
    },
    idPublicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicaciones',
        require: true
    },
    texto: {
        type: String,
        require: true
    },
    attachment: {
        type: Boolean,
        default: false
    },
    respuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentarios'
    }
}, {collection: "Comentarios", timestamps: true, versionKey: false});


ComentarioSchema.methods.publicData = function() {
    return {
        idUsuario: this.idUsuario,
        idPublicacion: this.idPublicacion,
        texto: this.texto,
        attachment: this.attachment,
        respuesta: this.respuesta
    };
};

mongoose.model('Comentario', ComentarioSchema);