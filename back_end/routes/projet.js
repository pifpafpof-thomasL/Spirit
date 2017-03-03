'use strict'

const express = require('express')
const app = express()

const inspect = require('util').inspect

//const inspect = require('util').inspect

module.exports = (db, viewpath = 'projets') => {

    app.get('/', (req, res) => {
            db.Projet.findAndCountAll({})
                .then((projets) => res
                .set("X-Total-Count", projets.count)
                .status(200)
                .json(projets.rows))
                .catch(e => res.status(404).send('db access error'))   
    })

    // app.options('/', (req, res) => {
    //     db.Projet.findAll({})
    //         .then((projets) => res.status(200).json(projets))
    //         .catch(e => res.status(404).send('db access error'))
    // })

    app.get('/:id', (req, res) => {
        db.Projet.find({ where: { id_projet: req.params.id } })
            .then((projet) => projet ?
                res.status(200).json(projet) :
                res.status(404).send('Not Found')
            )
    })

    app.delete('/:id', (req, res) => {
        db.Projet.findById(req.params.id)
            .then((projet) => projet.destroy())
            .then(() => res.status(200).send('delete ok'))
            .catch(e => res.status(404).send('error'))
    })

    app.post('/', (req, res) => {
        db.Projet.create(req.body)
            .then(projet => {
                const id_projet = projet.dataValues.id_projet
                res.append('Location', `${req.baseUrl}/` + id_projet).status(201).send('created ok')
            })
            .catch(e => {
                console.log(inspect(e.message))
                res.status(404).send('error')
            })
    })

    app.put('/:id', (req, res) => {
        db.Projet.findById(req.params.id)
            .then(projet => projet.update(req.body))
            .then(() => res.status(204).send('update ok'))
            .catch(e => res.status(404).send())
    })

    app.all('/', function (req, res, next) {
        console.log('Accessing the secret section ...')
        next() // pass control to the next handler
    })

    return app
}
