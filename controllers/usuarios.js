const Usuario = require('../models/Usuario');

// CRUD para Usuario
function crearUsuario(req, res) {
    var usuario = new Usuario(req.body);
    res.status(200).send(usuario); 
}

function recuperarUsuario(req, res){
    var usuarioID= new Usuario(req.params.id);
    res.status(200).send(usuarioID);
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

function consultaratributosartistas(req, res) {
    res.status(200).send('Mira los atributos  del  artista :o');
}

function consultarparametrosartistas(req, res) {
    res.status(200).send('Mira los parametros  del  artista :o');
}

function readTodosUsuarios(req, res){
    res.status(200).send('Aquí puedes ver todos lo usuarios de artline');
}

function readTopUsuarios(req, res){
    res.status(200).send('Aquí puedes ver el Top 10 de usuarios de artline');
}

module.exports = {
    crearUsuario,
    recuperarUsuario,
    modificarUsuario,
    eliminarUsuario,
    consultaratributosartistas,
    consultarparametrosartistas,
    readTodosUsuarios,
    readTopUsuarios
}