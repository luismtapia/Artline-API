const router = require('express').Router();
const auth = require('./auth');

const {
    createUsuario,
    readUsuario,
    updateUsuario,
    deleteUsuario,
    readAtributosUsuario,
    readParametrosUsuario,
    readTodosUsuarios,
    readTopUsuarios,
    readIdUsuario,
    loginSession

} = require('../controllers/usuarios');

router.get('/', readUsuario);
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);
router.get('/atributos', readAtributosUsuario);
router.get('/params', readParametrosUsuario);
router.get('/:id', readIdUsuario);
router.post('/', createUsuario);
router.post('/entrar', loginSession);
router.put('/:id', auth.requerido, updateUsuario);
router.delete('/:id', deleteUsuario);


module.exports = router;