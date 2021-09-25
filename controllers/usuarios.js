const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const passport = require('passport');

// CRUD para Usuario
function createUsuario(req, res, next) {
  const body = req.body;
  const password = body.password;

  delete body.password;

  const usuario = new Usuario(body);

  usuario.crearPassword(password);
  usuario.save()
    .then(user => res.status(200).json(user.toAuthJSON()))
    .catch(next);
}

function readUsuario(req, res) {
  const usuarioID = new Usuario(req.params.id);
  res.status(200).send(usuarioID);
}

function updateUsuario(req, res, next) {
  Usuario.findById(req.usuario.id)
    .then((user) => {
      if (!user) return res.sendStatus(401);

      let nuevaInfo = req.body;

      if (typeof nuevaInfo.password !== "undefined") {
        user.crearPassword(nuevaInfo.password);
      }

      if (typeof nuevaInfo.username !== "undefined") {
        user.username = nuevaInfo.username;
      }

      if (typeof nuevaInfo.followercount !== "undefined") {
        user.followercount = nuevaInfo.followercount;
      }

      if (typeof nuevaInfo.bio !== "undefined") {
        user.bio = nuevaInfo.bio;
      }

      if (typeof nuevaInfo.likes !== "undefined") {
        user.likes = nuevaInfo.likes;
      }

      user.save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

function deleteUsuario(req, res, next) {
  Usuario.findOneAndDelete({_id: req.usuario.id})
  .then(r => {
    res.status(200).send("Usuario eliminado")
  })
  .catch(next)
}

function readAtributosUsuario(req, res, next) {
  let atr = req.body.atr;
  let data;
  if (typeof (req.body.data) === 'string') { data = new RegExp(req.body.data, 'i'); }
  else { data = req.body.data }
  if (atr == "id" ||
    atr == "username" ||
    atr == "followercount" ||
    atr == "bio" ||
    atr == "likes") {
    Usuario.find({ [atr]: data })
      .then(usuarios => {
        if (!usuarios) return res.status(404);
        let resultado = []
        usuarios.forEach(usuario => {
          resultado.push(usuario.publicData())
        })
        return res.json(resultado);
      })
      .catch(next)
  } else { res.send("Atributo no valido."); }

}


function readParametrosUsuario(req, res) {
  res.status(200).send("Mira los parametros  del  artista :o");
}


function readIdUsuario(req, res, next) {
  Usuario.findById(req.usuario.id)
  .then(user => {
    if(!user) {
      return res.sendStatus(401)
    }
    return res.json(user.publicdata)
  }).catch(err => res.send (err));
}


function readTodosUsuarios(req, res, next) {
  Usuario.find()
    .then(usuarios => {
      if (!usuarios) return res.status(404);
      let resultado = []
      usuarios.forEach(usuario => {
        resultado.push(usuario.publicData())
      })
      return res.json(resultado);
    })
    .catch(next)
}

function readTopUsuarios(req, res, next) {
  Usuario.find().sort({ 'followercount': -1 }).limit(10)
    .then(usuarios => {
      if (!usuarios) return res.status(404);
      let resultado = []
      usuarios.forEach(usuario => {
        resultado.push(usuario.publicData())
      })
      return res.json(resultado);
    })
    .catch(next)
}

function loginSession(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(422).json({error: {username : 'Falta información'}});
  }

  passport.authenticate('local', { session: false}, 
  function (err, user, info){
    if(err) return next(err);
    if(user){
      user.token = user.generaJWT();
      return res.status(200).send(`¡Bienvenid@ a Artline, ${user.username}!`);      
    } else {     
      return res.status(422).json(info);
    }
  })(req, res, next)
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
  loginSession
};
