'use strict'

const express = require('express')
const app = express()
const inspect = require('util').inspect

module.exports = (db, viewpath = 'technos') => {

    // list all technos
    app.get('/', (req, res) => {
        db.Techno.findAll()
            .then(techno => res.status(200).json(techno))
            .catch(e => res.status(404).send('db access error'))
    })

    // find a techno
    app.get('/:id', (req, res) => {
        db.Techno.findById(req.params.id)
            .then((techno) => techno ?
                res.status(200).json(techno) :
                res.status(404).send('Not Found'))
    })

    // create new techno
    app.post('/', (req, res) => {
        db.Techno.create(req.body)
            .then(techno =>
                res.location(`${req.baseUrl}/${techno.dataValues.id_Techno}`).sendStatus(201))
            .catch(e => res.status(404).send('error'))
    })

    // delete a techno
    app.delete('/:id', (req, res) => {
        db.Techno.findById(req.params.id)
            .then(techno => techno.destroy())
            .then(done => res.sendStatus(204))
            .catch(error => res.sendStatus(404))
    })

    // update a techno
    app.put('/:id', (req, res) => {
        db.Techno.findById(req.params.id)
            .then(techno => techno.update(req.body))
            .then(done => res.status(200).json({id: `${req.params.id}`}))
            .catch(error => res.sendStatus(404))
    })

    return app
}
