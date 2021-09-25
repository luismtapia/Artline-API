const router = require('express').Router();

const {
    poblar,
    createComentario,
    readComentario,
    updateComentario,
    deleteComentario,
    ComentariosPORUsuario,
    ComentariosPORPublicacion,
    ComentariosRespuesta,
    readAtributosComentario,
    readParametroscomentarios
} = require('../controllers/comentarios');

// Métodos (verbos)
router.post('/', createComentario);
router.get('/poblar/:registros', poblar);
router.get('/comentariosBYusuario/:usuario', ComentariosPORUsuario);
router.get('/comentariosBYpublicacion/:publicacion', ComentariosPORPublicacion);
router.get('/comentariosBYrespuesta/:respuesta', ComentariosRespuesta);
router.get('/atributos', readAtributosComentario);
router.get('/params', readParametroscomentarios);
router.get('/:id', readComentario);
router.get('/', readComentario);
router.put('/:id', updateComentario);
router.delete('/:id', deleteComentario);

module.exports = router;