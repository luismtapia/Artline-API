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
    idUsuario: String, // 
    password: String, // JWT
    nombre: {type: String, required: true},
    followercount: Number,
    bio: {type: String, required: true},
    postcount: String, // 
    likes: Number
}, {collection: "usuarios", timestamps: true});

UsuarioSchema.methods.publicData = () => {
    return {
        id: this.id,
        nombre: this.nombre,
        followercount: this.followercount,
        bio: this.bio,
        likes: this.likes 
    }
}

mongoose.model("Usuario", UsuarioSchema);