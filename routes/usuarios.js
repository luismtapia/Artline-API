const router = require('express').Router();

const {
    crearUsuario,
    recuperarUsuario,
    modificarUsuario,
    eliminarUsuario,
    consultaratributosartistas,
    consultarparametrosartistas,
    readTodosUsuarios,
    readTopUsuarios

} = require('../controllers/usuarios');

router.get('/', recuperarUsuario);
router.post('/', crearUsuario);
router.put('/:id',     modificarUsuario);
router.delete('/:id',  eliminarUsuario);
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);

module.exports = router;
