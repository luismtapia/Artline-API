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
    console.log("entre");
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
    Publicacion.findById(req.params.id)
    .then(post => {
        if(!post){ return res.sendStatus(401);}
        let nuevapublicacion = req.body;
        if(typeof nuevapublicacion.idUsuario !== 'undefined')
            post.idUsuario = nuevapublicacion.idUsuario;
        if(typeof nuevapublicacion.imagen !== 'undefined')
            post.imagen = nuevapublicacion.imagen;
        if(typeof nuevapublicacion.descripcion !== 'undefined')
            post.descripcion = nuevapublicacion.descripcion;
        post.save()
            .then(postupdated => res.status(200).json(postupdated.publicData))
            .catch(next);
    })
    .catch(next);
}

function deletePublicacion(req, res, next) {
    Publicacion.findOneAndDelete({_id: req.params.id})
    .then(r => {
        res.status(200).send(`La publicacion ${r.descripcion} ha sido eliminada`);
    }).catch(next);
}

module.exports = {
    createPublicacion,
    readPublicacion,
    updatePublicacion,
    deletePublicacion
}