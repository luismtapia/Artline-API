const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function (username, password, next) {
    Usuario.findOne({ 'username': username })
    .then(function (user) {
      if (!user || !user.validarPassword(password)) {
        return next(null, false, { error: {'username o contraseña': 'incorrectos'} });
      }
      console.log(user);
      return next(null, user);
    })
    .catch(next);
  }));