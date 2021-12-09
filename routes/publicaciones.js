const router = require('express').Router();
const auth = require('./auth');
const {
    poblar,
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion,
    PublicacionesPORUsuario,
    TotalPublicacionesPORUsuario,
    readAtributosPublicacion,
    readParametrosPublicaciones,
    readNumPublicaciones
} = require('../controllers/publicaciones');

// Métodos (verbos)
router.post('/', createPublicacion); // auth.requerido
router.get('/poblar/:registros', poblar);
router.get('/postBYusuario/:usuario', PublicacionesPORUsuario); // auth.requerido?
router.get('/totalpostBYusuario/:usuario', TotalPublicacionesPORUsuario); // auth.requerido
router.get('/numPublicaciones/:idUsuario/:num', readNumPublicaciones);
router.get('/atributos', readAtributosPublicacion);// auth.requerido
router.get('/params', readParametrosPublicaciones);// auth.requerido
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion); // auth.requerido
router.delete('/:id', deletePublicacion);// auth.requerido

module.exports = router;