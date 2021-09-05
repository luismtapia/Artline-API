const router = require('express').Router();

const {

} = require('../controllers/publicaciones');

router.get('/', recuperarUsuario);
router.post('/', crearUsuario);
router.put('/:id',     modificarUsuario);
router.delete('/:id',  eliminarUsuario);

module.exports = router;



   