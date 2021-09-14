const mongoose = require('mongoose');
const Publicacion = mongoose.model("Publicacion");

// CRUD para Publicacion
function createPublicacion(req, res, next) {
    const publicacion = new Publicacion(req.body);
    publicacion.save()
    .then(post => {
        res.status(200).send(post);
    }).catch(next);
}

function readPublicacion(req, res, next) {
    if(req.params.id){// paso un id y solo regresa la publicacion de ese id
        Publicacion.findById(req.params.id)
        .then(post => {res.send(post)})
        .catch(next);
    }else{
        Publicacion.find()
        .then(post => res.send(post))
        .catch(next);
    }
}

function updatePublicacion(req, res, next) {
    res.send('Actualiza una Publicación');
}

function deletePublicacion(req, res, next) {
    Publicacion.findOneAndDelete({_id: req.params.id})
    .then(r => {
        res.status(200).send(`Elimina una Publicación con id ${req.params.id}`);
    }).catch(next);
}

module.exports = {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion
}