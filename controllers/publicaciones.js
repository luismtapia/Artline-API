const Publicacion = require('../models/Publicacion');

// CRUD para Publicacion
function createPublicacion(req, res) {
    const fecha = new Date();
    const publicacion = new Publicacion(req.body); // asumiendo que sea en body
    res.status(200).send(`Crea una nueva Publicación con fecha ${fecha}`);
}
function readPublicacion(req, res) {
    res.status(200).send('Lee las Publicaciones');
}
function updatePublicacion(req, res) {
    res.send('Actualiza una Publicación');
}
function deletePublicacion(req, res) {
    res.status(200).send(`Elimina una Publicación con id ${req.params.id}`);
}

module.exports = {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion
}