const Usuario = require("../models/Usuario");

// CRUD para Usuario
function createUsuario(req, res) {
  const usuario = new Usuario(req.body);
  res.status(200).send(usuario);
}

function readUsuario(req, res) {
  const usuarioID = new Usuario(req.params.id);
  res.status(200).send(usuarioID);
}

function updateUsuario(req, res) {
  const usuario = new Usuario(req.params.id);
  const modificaciones = req.body;
  usuario = { ...usuario, ...modificaciones };
  res.send(usuario);
}

function deleteUsuario(req, res) {
  res.status(200).send("El usuario ${req.params.id} se eliminó.");
}

function readAtributosUsuario(req, res) {
  res.status(200).send("Mira los atributos  del  artista :o");
}

function readParametrosUsuario(req, res) {
  res.status(200).send("Mira los parametros  del  artista :o");
}

function readIdUsuario(req, res) {
  res.status(200).send("Mira el ID del  artista :o");
}

function readTodosUsuarios(req, res) {
  res.status(200).send("Aquí puedes ver todos lo usuarios de artline");
}

function readTopUsuarios(req, res) {
  res.status(200).send("Aquí puedes ver el Top 10 de usuarios de artline");
}

module.exports = {
  createUsuario,
  readUsuario,
  updateUsuario,
  deleteUsuario,
  readAtributosUsuario,
  readParametrosUsuario,
  readIdUsuario,
  readTodosUsuarios,
  readTopUsuarios,
};
