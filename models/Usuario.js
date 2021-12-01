// Definición del Modelo Usuario
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    followercount: Number,
    bio: { type: String }, //Quitamos el required
    postcount: Number, // Número de posts - Aggregate
    likes: Number,
    hash: String,
    salt: String,
  },
  { collection: "Usuarios", timestamps: true, versionKey: false }
);

UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe ese username." });

UsuarioSchema.methods.publicData = function () {
  return {
    id: this._id,
    username: this.username,
    nombre: this.nombre,
    email: this.email,
    followercount: this.followercount,
    bio: this.bio,
    likes: this.likes,
  };
};

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UsuarioSchema.methods.validarPassword = function (password) {
  const newHash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === newHash;
};

UsuarioSchema.methods.generaJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

UsuarioSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    username: this.username,
    token: this.generaJWT()
  };
};

UsuarioSchema.methods.toLoginJSON = function () {
  return {
    id: this._id,
    username: this.username,
    nombre: this.nombre,
    email: this.email,
    followercount: 4,
    bio: "Soy una biografia",
    postcount: 5,
    likes: 5,
    token: this.generaJWT()
  };
};

mongoose.model("Usuario", UsuarioSchema);
