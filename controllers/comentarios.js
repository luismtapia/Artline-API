const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Comentario = mongoose.model("Comentario");

// imports para poblar BD
const Usuario = mongoose.model("Usuario");
const Publicacion = mongoose.model("Publicacion");
const {attachment,texto} = require('../config/variablesBD');

// CRUD para Comentario
function createComentario(req, res, next) {
    const nuevoComentario = new Comentario(req.body);
    nuevoComentario.save()
    .then(comment => {
        res.status(200).json(comment.publicData());
    }).catch(next);
}

function readComentario(req, res, next) {
  if (req.params.id) {// paso un id y solo regresa la Comentario de ese id
    Comentario.findById(req.params.id)
      .then(comment => { res.json(comment.publicData()) })
      .catch(next);
  } else {
    Comentario.find({},{texto: 1, attachment: 1})
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
      res.status(200).json(`Elimina un comentario con id ${req.params.id}`);
    }).catch(next);
}

// Endpoints
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

function readParametroscomentarios(req, res, next) {
    Comentario.find({}).select(`${req.body.data1} ${req.body.data2} ${req.body.data3} ${req.body.data4} ${req.body.data5}`)
    .then(comentarios => {
        if (!comentarios) return res.status(404);
        let comentario = []
        comentarios.forEach(publicacion => {
            comentario.push(publicacion.publicData())
        })
        return res.json(comentario);
    })
    .catch(next)
}

// Codigo para poblar la Base de Datos
async function poblar(req, res, next) {
    const registros = req.params.registros;
    const usuarios = await Usuario.aggregate([{'$count': 'total_usuarios'}]);
    const publicaciones = await Publicacion.aggregate([{'$count': 'total_post'}]);
    const comentarios = await Comentario.aggregate([{'$count': 'total_comentarios'}]);

    const aleatorio = max => Math.floor(Math.random()*max);
    let total_usuarios=usuarios[0].total_usuarios;
    let total_post=publicaciones[0].total_post;
    let total_comentarios=comentarios[0].total_comentarios;

    for (let index = 0; index < registros; index++) {
          const idUser =  await Usuario.findOne().skip(aleatorio(total_usuarios));
          const idPost =  await Publicacion.findOne().skip(aleatorio(total_post));
          const idComment =  await Comentario.findOne().skip(aleatorio(total_comentarios));
          const respuesta = [idComment._id, null];

          let nuevocomentario = new Comentario ({
              idUsuario : idUser._id,
              idPublicacion : idPost._id,
              texto : texto[aleatorio(texto.length)],
              attachment : attachment[aleatorio(attachment.length)],
              respuesta : respuesta[aleatorio(respuesta.length)]
          });
          //console.log(nuevocomentario);
          nuevocomentario.save()
          .then(comment => {
              res.status(200).send(`${registros} registros insertados correctamente`);
          })
          .catch(next);
      } // fin for
}

module.exports = {
  poblar,
  createComentario,
  readComentario,
  updateComentario,
  deleteComentario,
  ComentariosPORUsuario,
  ComentariosPORPublicacion,
  ComentariosRespuesta,
  readAtributosComentario,
  readParametroscomentarios
}