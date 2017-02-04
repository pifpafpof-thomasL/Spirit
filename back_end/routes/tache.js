'use strict'

// TODO : vérifier que id_projet et id_TacheParent existent !!

const express = require('express')
const app = express()
//const inspect = require('util').inspect

module.exports = (db, viewpath = 'Tache') => {

  // list all tasks
  app.get('/', (req, res) => {
    db.Tache.findAll()
    .then(task => res.status(200).json(task))
    .catch(error => res.sendStatus(404))
  })

  // find one particular task
  app.get('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then(task => task ?
      res.status(200).json(task) :
      res.sendStatus(404))
    .catch(error => res.send('An error has occured'))
  })

  // create a new task
  app.post('/', (req, res) => {
    db.Tache.create(req.body)
    .then(task => res.location(`/tache/${task.dataValues.id_Tache}`).sendStatus(201))
    .catch(error => res.sendStatus(404))
  })

  // delete a task
  app.delete('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then(task => task.destroy())
    .then(done => res.sendStatus(200))
    .catch(error => res.sendStatus(404))
  })

  // update a task
  app.put('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then(task => task.update(req.body))
    .then(done => res.sendStatus(200))
    .catch(error => res.sendStatus(404))
  })

  return app
}
