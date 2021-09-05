const Usuario = require('../models/Usuario');

// CRUD para Usuario
function createUsuario(req, res) {
    var usuario = new Usuario(req.body);
    res.status(200).send(usuario); 
}

function readUsuario(req, res){
    var usuarioID= new Usuario(req.params.id);
    res.status(200).send(usuarioID);
}

function updateUsuario (req,res){
    var usuario = new Usuario(req.params.id);
    var modificaciones =req.body;
    usuario = {...usuario,...modificaciones}
    res.send(usuario);
}

function deleteUsuario (req, res){
    res.status(200).send('El usuario ${req.params.id} se eliminó.');
}

function consultarAtributosArtistas(req, res) {
    res.status(200).send('Mira los atributos  del  artista :o');
}

function consultarParametrosArtistas(req, res) {
    res.status(200).send('Mira los parametros  del  artista :o');
}

function consultarIdArtista(req, res) {
    res.status(200).send('Mira el ID del  artista :o');
}

function readTodosUsuarios(req, res){
    res.status(200).send('Aquí puedes ver todos lo usuarios de artline');
}

function readTopUsuarios(req, res){
    res.status(200).send('Aquí puedes ver el Top 10 de usuarios de artline');
}

module.exports = {
    createUsuario,
    readUsuario,
    updateUsuario,
    deleteUsuario,
    consultaratributosartistas,
    consultarparametrosartistas,
    readTodosUsuarios,
    readTopUsuarios
}