const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const passport = require("passport");

// CRUD para Usuario
function createUsuario(req, res, next) {
  const body = req.body;
  const password = body.password;

  if (
    body.email !== "" &&
    body.nombre !== "" &&
    body.username !== "" &&
    password !== ""
  ) {
    delete body.password;
    console.log("Ya borré la contraseña....");
    const usuario = new Usuario(body);

    usuario.crearPassword(password);
    usuario
      .save()
      .then((user) => res.status(200).json(user.toAuthJSON()))
      .catch(next);
  } else {
    return res.status(422).json({ error: "Falta información. Favor de llenar todo el registro." });
  }
}

function updateUsuario(req, res, next) {
  /* passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) return next(err);
      if (user) {
        console.log(`¡Se actualizaron tus datos ${user.nombre}!`);
        return res.status(200).json(user.toLoginJSON());
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next); */
  Usuario.findById(req.usuario.id)
    .then((user) => {
      
      if (!user) return res.sendStatus(401);

      let nuevaInfo = req.body;

      if (typeof nuevaInfo.password !== "undefined") {
        user.crearPassword(nuevaInfo.password);
      }

      if (typeof nuevaInfo.nombre !== "undefined") {
        user.nombre = nuevaInfo.nombre;
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

      user
        .save()
        .then((updated) => {
          res.status(201).json(updated.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

function deleteUsuario(req, res, next) {
  Usuario.findByIdAndDelete(req.params.id)
    .then((r) => {
      res.status(200).send(`El usuario ${r.username} fue eliminado`);
    })
    .catch(next);
}

function readAtributosUsuario(req, res, next) {
  let atr = req.body.atr;
  let data;
  if (typeof req.body.data === "string") {
    data = new RegExp(req.body.data, "i");
  } else {
    data = req.body.data;
  }
  if (
    atr == "id" ||
    atr == "username" ||
    atr == "nombre" ||
    atr == "email" ||
    atr == "followercount" ||
    atr == "bio" ||
    atr == "likes"
  ) {
    Usuario.find({ [atr]: data })
      .then((usuarios) => {
        if (!usuarios) return res.status(404);
        let resultado = [];
        usuarios.forEach((usuario) => {
          resultado.push(usuario.publicData());
        });
        return res.json(resultado);
      })
      .catch(next);
  } else {
    res.send("Atributo no válido.");
  }
}

function readParametrosUsuario(req, res, next) {
  Usuario.find({})
    .select(
      `${req.body.data1} ${req.body.data2} ${req.body.data3} ${req.body.data4} ${req.body.data5} ${req.body.data6} ${req.body.data7} `
    )
    .then((usuarios) => {
      if (!usuarios) return res.status(404);
      let resultado = [];
      usuarios.forEach((usuario) => {
        resultado.push(usuario.publicData());
      });
      return res.json(resultado);
    })
    .catch(next);
}

function readIdUsuario(req, res) {
  Usuario.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }
      return res.json(user.publicData());
    })
    .catch((err) => res.send(err));
}

function readTodosUsuarios(req, res, next) {
  Usuario.find()
    .then((usuarios) => {
      if (!usuarios) return res.status(404);
      let resultado = [];
      usuarios.forEach((usuario) => {
        resultado.push(usuario.publicData());
      });
      return res.json(resultado);
    })
    .catch(next);
}

function totalUsuarios(req, res, next) {
  Usuario.aggregate([
    {
      $count: "Total de usuarios registrados",
    },
  ])
    .then((r) => res.status(200).send(r))
    .catch(next);
}

function readTopUsuarios(req, res, next) {
  Usuario.find()
    .sort({ followercount: -1 })
    .limit(10)
    .then((usuarios) => {
      if (!usuarios) return res.status(404);
      let resultado = [];
      usuarios.forEach((usuario) => {
        resultado.push(usuario.publicData());
      });
      return res.json(resultado);
    })
    .catch(next);
}

function loginSession(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ error: "Falta información" });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) return next(err);
      if (user) {
        console.log(`¡Bienvenid@ a Artline, ${user.name}!`);
        console.log(user);
        return res.status(200).json(user.toLoginJSON());
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
}

module.exports = {
  createUsuario,
  updateUsuario,
  deleteUsuario,
  readAtributosUsuario,
  readParametrosUsuario,
  readIdUsuario,
  readTodosUsuarios,
  totalUsuarios,
  readTopUsuarios,
  loginSession,
};
