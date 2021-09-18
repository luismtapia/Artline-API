const router = require('express').Router();

const {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion,
    PublicacionesPORUsuario
} = require('../controllers/publicaciones');

// Métodos (verbos)
router.post('/', createPublicacion);
router.get('/postBYusuarios/:usuario', PublicacionesPORUsuario);
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;