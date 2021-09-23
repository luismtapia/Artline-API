const router = require('express').Router();

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
router.get('/todosUsuarios',readTodosUsuarios);
router.get('/topUsuarios',readTopUsuarios);
router.get('/atributos/', readAtributosUsuario);
router.get('/params', readParametrosUsuario);
router.get('/:id', readIdUsuario);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);


module.exports = router;