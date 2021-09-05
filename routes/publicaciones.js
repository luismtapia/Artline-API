const router = require('express').Router();

const {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion
} = require('../controllers/publicaciones');

// Métodos (verbos)
router.post('/', createPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;