const router = require('express').Router();

const { Router } = require('express');
const {
    crearUsuario,
    recuperarUsuario,
    modificarUsuario,
    eliminarUsuario,
    consultarAtributosArtistas,
    consultarParametrosArtistas,
    readTodosUsuarios,
    readTopUsuarios,
    consultarIdArtista

} = require('../controllers/usuarios');

router.get('/', recuperarUsuario);
router.get('/:id', consultarIdArtista);
router.get('/atributos', consultarAtributosArtistas);
router.get('/params', consultarParametrosArtistas);
router.post('/', crearUsuario);
router.put('/:id',     modificarUsuario);
router.delete('/:id',  eliminarUsuario);
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);

module.exports = router;
