// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res) => {
    res.send('Bienvenido a Artline');
});

//router.use('/usuarios', require('./usuarios'));

// exportamos nuestro nuevo router
module.exports = router;
