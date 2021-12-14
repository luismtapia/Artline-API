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
router.post('/', auth.requerido, createPublicacion); // auth.requerido
router.get('/poblar/:registros', poblar);
router.get('/postBYusuario/:usuario', auth.requerido, PublicacionesPORUsuario); // auth.requerido?
router.get('/totalpostBYusuario/:usuario', auth.requerido, TotalPublicacionesPORUsuario); // auth.requerido
router.get('/numPublicaciones/:idUsuario/:num', readNumPublicaciones);
router.get('/atributos', auth.requerido, readAtributosPublicacion);// auth.requerido
router.get('/params', auth.requerido, readParametrosPublicaciones);// auth.requerido
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', auth.requerido, updatePublicacion); // auth.requerido
router.delete('/:id', auth.requerido, deletePublicacion);// auth.requerido

module.exports = router;