// importamos las dependencias necesarias
const router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res) => {
    res.send('Bienvenido a Artline');
});

router.use('/publicaciones', require('./publicaciones'));
router.use('/comentarios', require('./comentarios'));
router.use('/usuarios', require('./usuarios'));

// exportamos nuestro nuevo router
module.exports = router;
