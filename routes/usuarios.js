const router = require('express').Router();

const {
    createUsuario,
    readUsuario,
    updateUsuario,
    deleteUsuario,
    consultaratributosartistas,
    consultarparametrosartistas,
    readTodosUsuarios,
    readTopUsuarios

} = require('../controllers/usuarios');

router.get('/', readUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);

module.exports = router;
