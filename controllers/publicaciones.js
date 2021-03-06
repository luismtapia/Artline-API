const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Publicacion = mongoose.model("Publicacion");
const { cloudinary } = require('../config/cloudinary');

// imports para poblar BD
const Usuario = mongoose.model("Usuario");
const { imagenes, descripciones } = require('../config/variablesBD');

// CRUD para Publicacion
const createPublicacion = async (req, res, next) => {
    const info = req.body;
    if (typeof info.imagen !== "undefined") {
        const uploadedResponse = await cloudinary.v2.uploader.
            upload(info.imagen, {
                folder: "artline/publicaciones"
            });
        // console.log(uploadedResponse)
        info.imagen = uploadedResponse.secure_url;
    }
    const publicacion = new Publicacion(info);
    publicacion.save()
        .then(post => {
            res.status(200).json(post.publicData());
        }).catch(next);
}

function readPublicacion(req, res, next) {
    if (req.params.id) {// paso un id y solo regresa la publicacion de ese id
        Publicacion.aggregate([
            {
                '$match': {
                    '_id': new ObjectId(req.params.id)
                }
            }, {
                '$project': {
                    '_id': 1,
                    'idUsuario': 1,
                    'imagen': 1,
                    'descripcion': 1,
                    'likes': 1,
                    'comentarios': 1,
                    'shares': 1,
                    'createdAt': 1
                }
            }, {
                '$lookup': {
                    'from': 'Usuarios',
                    'localField': 'idUsuario',
                    'foreignField': '_id',
                    'as': 'usuario'
                }
            }
        ])
            .then(post => {
                res.status(200).json(post);
            })
            .catch(next);
        /*Publicacion.findById(req.params.id)
            .then(post => {
                res.status(200).json(post.publicData());
            })
            .catch(next);*/
    } else {
        Publicacion.aggregate([
            {
                '$project': {
                    '_id': 1,
                    'idUsuario': 1,
                    'imagen': 1,
                    'descripcion': 1,
                    'likes': 1,
                    'comentarios': 1,
                    'shares': 1,
                    'createdAt': 1
                }
            }, {
                '$lookup': {
                    'from': 'Usuarios',
                    'localField': 'idUsuario',
                    'foreignField': '_id',
                    'as': 'usuario'
                }
            }
        ])
            /*Publicacion.find({}, { idUsuario: 1, imagen: 1, descripcion: 1, likes: 1, comentarios: 1, shares: 1, createdAt: 1 })
                .populate({ path: 'idUsuario', model: Usuario })*/
            .then(post => {
                res.status(200).send(post);
            })
            .catch(next);
    }
}

function updatePublicacion(req, res, next) {
    Publicacion.findById(req.params.id)
        .then(post => {
            if (!post) { return res.sendStatus(401); }
            let nuevapublicacion = req.body;
            // usuario no puede cambiarse
            if (typeof nuevapublicacion.idUsuario !== 'undefined')
                post.idUsuario = nuevapublicacion.idUsuario;
            // eliminar arriba y agregar comentarios y shares abajo
            // if (typeof nuevapublicacion.imagen !== 'undefined')
            //     post.imagen = nuevapublicacion.imagen;
            if (typeof nuevapublicacion.descripcion !== 'undefined')
                post.descripcion = nuevapublicacion.descripcion;
            if (typeof nuevapublicacion.likes !== 'undefined')
                post.likes = nuevapublicacion.likes;
            if (typeof nuevapublicacion.comentarios !== 'undefined')
                post.comentarios = nuevapublicacion.comentarios;
            if (typeof nuevapublicacion.shares !== 'undefined')
                post.shares = nuevapublicacion.shares;
            post.save()
                .then(postupdated => res.status(200).json(postupdated.publicData()))
                .catch(next);
        })
        .catch(next);
}

function deletePublicacion(req, res, next) {
    Publicacion.findOneAndDelete({ _id: req.params.id })
        .then(r => {
            res.status(200).send(`La publicacion ${r.descripcion} ha sido eliminada`);
        }).catch(next);
}

// Endpoints
function PublicacionesPORUsuario(req, res, next) {
    let usuario = req.params.usuario;
    Publicacion.aggregate([
        {
            '$match': {
                'idUsuario': new ObjectId(usuario)
            }
        }, {
            '$project': {
                '_id': 1,
                'idUsuario': 1,
                'imagen': 1,
                'descripcion': 1,
                'likes': 1,
                'comentarios': 1,
                'shares': 1,
                'createdAt': 1
            }
        }, {
            '$lookup': {
                'from': 'Usuarios',
                'localField': 'idUsuario',
                'foreignField': '_id',
                'as': 'usuario'
            }
        }
    ])
        .then(r => res.status(200).send(r))
        .catch(next);
}

function TotalPublicacionesPORUsuario(req, res, next) {
    const usuario = req.params.usuario;
    Publicacion.aggregate([
        {
            '$match': {
                'idUsuario': new ObjectId(usuario)
            }
        }, {
            '$count': 'total'
        }
    ])
        .then(r => res.status(200).send(r))
        .catch(next);
}
function readAtributosPublicacion(req, res, next) {
    let atr = req.body.atr;
    let data = new RegExp(req.body.data, 'i');
    if (atr == "imagen" ||
        atr == "descripcion" ||
        atr == "id") {
        Publicacion.find({ [atr]: data })
            .then(publicaciones => {
                if (!publicaciones) return res.status(404);
                let resultado = []
                publicaciones.forEach(publicacion => {
                    resultado.push(publicacion.publicData())
                })
                return res.json(resultado);
            })
            .catch(next)
    } else { res.send("Atributo no valido."); }
}
function readParametrosPublicaciones(req, res, next) {

    Publicacion.find({}).select(`${req.body.data1} ${req.body.data2} ${req.body.data3}`)
        .then(publicaciones => {
            if (!publicaciones) return res.status(404);
            let resultado = []
            publicaciones.forEach(publicacion => {
                resultado.push(publicacion.publicData())
            })
            return res.json(resultado);
        })
        .catch(next)
}
function readNumPublicaciones(req, res, next) {
    const idUsuario = req.params.idUsuario;
    let num = parseInt(req.params.num);
    Publicacion.find({ idUsuario: idUsuario }).limit(num)
        .then(publicaciones => {
            if (!publicaciones) return res.status(404);
            let resultado = []
            publicaciones.forEach(publicacion => {
                resultado.push(publicacion.publicData())
            })
            return res.json(resultado);
        })
        .catch(next)
}

// Codigo para poblar la Base de Datos
async function poblar(req, res, next) {
    const registros = req.params.registros;
    const usuarios = await Usuario.aggregate([{ '$count': 'total_usuarios' }]);

    const aleatorio = max => Math.floor(Math.random() * max);
    let total_usuarios = usuarios[0].total_usuarios;

    for (let index = 0; index < registros; index++) {
        const idUser = await Usuario.findOne().skip(aleatorio(total_usuarios));
        let nuevapublicacion = new Publicacion({
            idUsuario: idUser._id,
            imagen: imagenes[aleatorio(imagenes.length)],
            descripcion: descripciones[aleatorio(descripciones.length)],
            likes: 52
        });
        nuevapublicacion.save()
            .then(post => {
                res.status(200).send(`${registros} registros insertados correctamente`);
            })
            .catch(next);
    } // fin for
}

module.exports = {
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
}