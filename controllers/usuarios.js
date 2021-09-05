const Usuario = require('../models/Usuario');

// CRUD para Publicacion
function crearUsuario(req, res) {
    var usuario = new Usuario(req.body);
    res.status(200).send(usuario); 
}

function recuperarUsuario(req, res){
    var usuarioID= new Usuario(req.params.id);
    res.status(200).send(usuario);
}

function modificarUsuario (req,res){
    var usuario = new Usuario(req.params.id);
    var modificaciones =req.body;
    usuario = {...usuario,...modificaciones}
    res.send(usuario);
}

function eliminarUsuario (req, res){
    res.status(200).send('El usuario ${req.params.id} se eliminó.');
}




module.exports = {
    crearUsuario,
    recuperarUsuario,
    modificarUsuario,
    eliminarUsuario
}