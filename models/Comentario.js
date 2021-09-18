const mongoose = require('mongoose');

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
        require: true
    },
    respuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentarios'
    }
}, {collection: "Comentarios", timestamps: true});

ComentarioSchema.methods.publicData = () => {
    return {
        idUsuario: this.idUsuario,
        idPublicacion: this.idPublicacion,
        texto: this.texto,
        attachment: this.attachment,
        respuesta: this.respuesta
    };
};

mongoose.model('Comentario', ComentarioSchema);