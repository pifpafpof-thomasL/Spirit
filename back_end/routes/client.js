'use strict'

const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'clients') => {

  //API REST for Client
  // Get all Client
  app.get('/', (req, res) => {
    db.Client.findAll()
      .then(client => res.status(200).json(client))
      .catch(e => res.status(404).send('acces error'))
  })

  // Get single Client
  app.get('/:id', (req, res) => {
    db.Client.findById(req.params.id)
      .then((client) => client ?
        res.status(200).json(client) :
        res.sendStatus(404))
      .catch(error => res.send('Unknown error'))
  })

  app.post('/', (req, res) => {
    db.Client.create(req.body)
      .then(client =>
        res.location(`/clients/${client.dataValues.id_Client}`).sendStatus(201))
      .catch(e => res.status(404).send('error'))
  })



  // delete  client
  app.delete('/:id', (req, res) => {
    db.Client.findById(req.params.id)
      .then((client) =>
        client.destroy())
      .then(done => res.sendStatus(204))
      .catch(error => res.sendStatus(404))
  })


  app.put('/:id', (req, res) => {
    db.Client.findById(req.params.id)
      .then(client =>
        client.update(req.body))
      .then(done => res.sendStatus(204))
      .catch(error => res.sendStatus(404))
  })


  return app
}
