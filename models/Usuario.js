// Clase para los usuarios, 
class Usuario{
    constructor(id, idUsuario, contraseña, nombre, followercount, bio, postcount, likes){
        this.id = id;
        this.idUsuario = idUsuario;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.followercount = followercount;
        this.bio = bio;
        this.postcount = postcount;
        this.likes = likes;
    }
}

module.exports = Usuario;

