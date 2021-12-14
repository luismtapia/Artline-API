const router = require('express').Router();
const auth = require('./auth');

const {
    createUsuario,
    updateUsuario,
    deleteUsuario,
    readAtributosUsuario,
    readParametrosUsuario,
    readTodosUsuarios,
    totalUsuarios,
    readTopUsuarios,
    readIdUsuario,
    loginSession

} = require('../controllers/usuarios');

router.get('/todosUsuarios', auth.requerido, readTodosUsuarios);
router.get('/totalUsuarios', auth.requerido, totalUsuarios);
router.get('/topUsuarios', auth.requerido, readTopUsuarios);
router.get('/atributos', auth.requerido, readAtributosUsuario);
router.get('/params', auth.requerido, readParametrosUsuario);
router.get('/:id', auth.requerido, readIdUsuario);
router.post('/', createUsuario);
router.post('/entrar', loginSession);
router.put('/:id', auth.requerido, updateUsuario);
router.delete('/:id', auth.requerido, deleteUsuario);

module.exports = router;