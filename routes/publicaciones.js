const router = require('express').Router();

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
router.post('/', createPublicacion);
router.get('/poblar/:registros', poblar);
router.get('/postBYusuario/:usuario', PublicacionesPORUsuario);
router.get('/totalpostBYusuario/:usuario', TotalPublicacionesPORUsuario);
router.get('/numPublicaciones/:idUsuario/:num', readNumPublicaciones);
router.get('/atributos/', readAtributosPublicacion);
router.get('/params/', readParametrosPublicaciones);
router.get('/:id', readPublicacion);
router.get('/', readPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;