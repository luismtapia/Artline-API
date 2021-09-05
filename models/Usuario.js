// Clase para los usuarios, 
class Usuario{
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

module.exports = Usuario;

