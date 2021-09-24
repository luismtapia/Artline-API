const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Comentario = mongoose.model("Comentario");

// CRUD para Comentario
function createComentario(req, res, next) {
  const nuevoComentario = new Comentario(req.body);
  nuevoComentario.save()
    .then(comment => {
      res.status(200).send(comment);
    }).catch(next);
}

function readComentario(req, res, next) {
  if (req.params.id) {// paso un id y solo regresa la Comentario de ese id
    Comentario.findById(req.params.id)
      .then(comment => { res.send(comment) })
      .catch(next);
  } else {
    Comentario.find()
      .then(comment => res.send(comment))
      .catch(next);
  }
}

function updateComentario(req, res, next) {
  Comentario.findById(req.params.id)
    .then(comment => {
      if (!comment) { return res.sendStatus(401); }
      let nuevoComentario = req.body;
      if (typeof nuevoComentario.idUsuario !== 'undefined')
        comment.idUsuario = nuevoComentario.idUsuario;
      if (typeof nuevoComentario.idPublicacion !== 'undefined')
        comment.idPublicacion = nuevoComentario.idPublicacion;
      if (typeof nuevoComentario.texto !== 'undefined')
        comment.texto = nuevoComentario.texto;
      if (typeof nuevoComentario.attachment !== 'undefined')
        comment.attachment = nuevoComentario.attachment;
      if (typeof nuevoComentario.respuesta !== 'undefined')
        comment.respuesta = nuevoComentario.respuesta;
      comment.save()
        .then(commentupdated => res.status(200).json(commentupdated.publicData))
        .catch(next);
    })
    .catch(next);
}

function deleteComentario(req, res, next) {
  Comentario.findOneAndDelete({ _id: req.params.id })
    .then(r => {
      res.status(200).send(`Elimina un comentario con id ${req.params.id}`);
    }).catch(next);
}

function ComentariosPORUsuario(req, res, next) {
  let usuario = req.params.usuario;
  Comentario.aggregate([
    {
      '$match': {
        'idUsuario': new ObjectId(usuario)
      }
    }
  ])
    .then(comment => res.status(200).send(comment))
    .catch(next);
}

function ComentariosPORPublicacion(req, res, next) {
  let post = req.params.publicacion;
  Comentario.aggregate([
    {
      '$match': {
        'idPublicacion': new ObjectId(post)
      }
    }
  ])
    .then(comment => res.status(200).send(comment))
    .catch(next);
}

function ComentariosPORattachment(req, res, next) {
  let attachment = req.params.attachment;
  Comentario.aggregate([
    {
      '$match': {
        'attachment': attachment
      }
    }
  ])
    .then(comment => res.status(200).send(comment))
    .catch(next);
}

function ComentariosRespuesta(req, res, next) {
  let respuesta = req.params.respuesta;
  Comentario.aggregate([
    {
      '$match': {
        'respuesta': new ObjectId(respuesta)
      }
    }
  ])
    .then(comment => res.status(200).send(comment))
    .catch(next);
}
function readAtributosComentario(req, res, next) {

  let atr = req.body.atr;
  let data;
  if (atr == "idUsuario" || atr == "idPublicacion") {
     data = mongoose.Types.ObjectId(req.body.data);
  } else {
     data = new RegExp(req.body.data, 'i');
  }

  if (atr == "idUsuario" ||
    atr == "idPublicacion" ||
    atr == "texto" ||
    atr == "attachment" ||
    atr == "respuesta") {
    Comentario.find({ [atr]: data })
      .then(Comentarios => {
        if (!Comentarios) return res.status(404);
        let resultado = []
        Comentarios.forEach(comentario => {
          resultado.push(comentario.publicData())
        })
        return res.json(resultado);
      })
      .catch(next)
  } else { res.send("Atributo no valido."); }
}
module.exports = {
  createComentario,
  readComentario,
  updateComentario,
  deleteComentario,
  ComentariosPORUsuario,
  ComentariosPORPublicacion,
  ComentariosRespuesta,
  readAtributosComentario
}