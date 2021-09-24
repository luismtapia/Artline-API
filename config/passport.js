const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password'
  }, function (nombre, password, next) {
    Usuario.findOne({ 'nombre': nombre })
    .then(function (user) {
      if (!user || !user.validarPassword(password)) {
        return next(null, false, { error: {'nombre o contraseña': 'incorrectos'} });
      }
      console.log(user);
      return next(null, user);
    })
    .catch(next);
  }));