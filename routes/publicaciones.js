const router = require('express').Router();

const {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion,
    PublicacionesPORUsuario,
    TotalPublicacionesPORUsuario
} = require('../controllers/publicaciones');

// Métodos (verbos)
router.post('/', createPublicacion);
router.get('/postBYusuarios/:usuario', PublicacionesPORUsuario);
router.get('/totalpostBYusuarios/:usuario', TotalPublicacionesPORUsuario);
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;