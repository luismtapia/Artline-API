// Clase para los usuarios, 
/* class Usuario{
    constructor(id, idUsuario, password, nombre, followercount, bio, postcount, likes){
        this.id = id;
        this.idUsuario = idUsuario;
        this.password = password;
        this.nombre = nombre;
        this.followercount = followercount;
        this.bio = bio;
        this.postcount = postcount;
        this.likes = likes;
    }
}
module.exports = Usuario; */

// Definición del Modelo Usuario
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    password: {type: String, required: true}, // JWT - Passport
    nombre: {type: String, required: true},
    followercount: Number,
    bio: {type: String, required: true},
    postcount: Number, // Número de posts - Aggregate
    likes: Number
}, {collection: "Usuarios", timestamps: true, versionKey: false});

UsuarioSchema.methods.publicData = function () {
    return {
        id: this.id,
        nombre: this.nombre,
        followercount: this.followercount,
        bio: this.bio,
        likes: this.likes 
    }
}

mongoose.model("Usuario", UsuarioSchema);