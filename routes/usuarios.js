const router = require('express').Router();

const { Router } = require('express');
const {
    createUsuario,
    readUsuario,
    updateUsuario,
    deleteUsuario,
    readAtributosUsuario,
    readParametrosUsuario,
    readTodosUsuarios,
    readTopUsuarios,
    readIdUsuario

} = require('../controllers/usuarios');

router.get('/', readUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.get('/:id', readIdUsuario);
router.get('/atributos', readAtributosUsuario);
router.get('/params', readParametrosUsuario);
router.delete('/:id', deleteUsuario);
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);

module.exports = router;
