'use strict'

const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'clients') => {

  //API REST for Client
  // Get all Client
  app.get('/', (req, res) => {
    db.Client.findAll({})
      .then((clients) => res.status(200).res.json(clients))
      .catch(e => res.status(404).send('acces error'))
  })

  // Get single Client
  app.get('/:id', (req, res) => {
    db.Client.find({
        where: {
          id_client: req.params.id
        }
      })
      .then((client) => client ?
        res.status(200).json(client) :
        res.status(404).send('unknown Client'))
  })

  // delete  client
  app.delete('/:id', (req, res) => {
    db.Client.findById(req.params.id)
      .then((client) =>
        client.destroy())
      .then(() => res.status(200).send('delete ok'))
      .catch(e => res.status(404).send('no such user'))
  })

  app.post('/', (req, res) => {
    db.Client.create(req.body)
      .then(client => {
        const id_client = client.dataValues.id_client
        res.status(201).append('Location', '/' + id_client).send('created ')
      })
      .catch(e => res.status(404).send(`Unable to create Client`))
  })


  app.put('/:id', (req, res) => {
    db.Client.findById(req.params.id)
      .then(client =>
        client.update(req.body.user))
      .then(res.status(204).send(`update`))
      .catch(e => res.status(404).send('no such user'))
  })


  return app
}