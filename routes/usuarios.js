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

router.get('/todosUsuarios', readTodosUsuarios);
router.get('/totalUsuarios', totalUsuarios);
router.get('/topUsuarios', readTopUsuarios);
router.get('/atributos', readAtributosUsuario);
router.get('/params', readParametrosUsuario);
router.get('/:id', readIdUsuario);
router.post('/', createUsuario);
// router.post('/entrar', auth.requerido, loginSession);
router.post('/entrar', loginSession);
// router.put('/:id', auth.requerido, updateUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);


module.exports = router;