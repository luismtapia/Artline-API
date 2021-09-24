const router = require('express').Router();

const {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion,
    PublicacionesPORUsuario,
    TotalPublicacionesPORUsuario,
    readAtributosPublicacion,
    readNumPublicaciones
} = require('../controllers/publicaciones');

// Métodos (verbos)
router.post('/', createPublicacion);
router.get('/postBYusuario/:usuario', PublicacionesPORUsuario);
router.get('/totalpostBYusuario/:usuario', TotalPublicacionesPORUsuario);
router.get('/numPublicaciones/:idUsuario', readNumPublicaciones);
router.get('/atributos/', readAtributosPublicacion);
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;