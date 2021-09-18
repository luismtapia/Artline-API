const mongoose = require('mongoose');
const Comentario = mongoose.model("Comentario");

// CRUD para Comentario
function createComentario(req, res, next) {
    const nuevoComentario = new Comentario(req.body);
    nuevoComentario.save()
    .then(comment => {
        res.status(200).send(comment);
    }).catch(next);
}

function readComentario(req, res, next) {
    if(req.params.id){// paso un id y solo regresa la Comentario de ese id
        Comentario.findById(req.params.id)
        .then(comment => {res.send(comment)})
        .catch(next);
    }else{
        Comentario.find()
        .then(comment => res.send(comment))
        .catch(next);
    }
}

function updateComentario(req, res, next) {
    res.send('Actualiza una Publicación');
}

function deleteComentario(req, res, next) {
    Comentario.findOneAndDelete({_id: req.params.id})
    .then(r => {
        res.status(200).send(`Elimina un comentario con id ${req.params.id}`);
    }).catch(next);
}

module.exports = {
    createComentario,
    readComentario,
    updateComentario,
    deleteComentario
}