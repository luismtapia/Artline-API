const router = require('express').Router();

const {
    createComentario,
    readComentario,
    updateComentario,
    deleteComentario
} = require('../controllers/comentarios');

// Métodos (verbos)
router.post('/', createComentario);
router.get('/:id', readComentario);
router.get('/', readComentario);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

module.exports = router;