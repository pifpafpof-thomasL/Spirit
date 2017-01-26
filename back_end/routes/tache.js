const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'Tache') => {

  //list all tasks
  app.get('/', (req, res) => {
    db.Tache.findAll()
    .then(task => res.json(task))
    .catch(error => res.sendStatus(404))
  })

  //find one particular task
  app.get('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then((task) => task ?
      res.status(200).json(task) :
      res.sendStatus(404))
    .catch(error => console.log(error))
  })

  //create a new task
  app.post('/', (req, res) => {
    db.Tache.create(req.body)
    //.then(tache => res.status(201).send(`${tache} créée`)).then(tache => res.location())
    .then(task => {
      // TODO : redirect à paufiner
      //let id_tache = task.dataValues
      //console.log(id_tache)
      res.redirect(201, `/tache/${req.body.id_Tache}`)
    })
    .catch(error => res.json(e))
  })

  // delete a task
  app.delete('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then(task => task.destroy())
    .then(done => res.sendStatus(200))
    .catch(error => res.sendStatus(404))
  })

  //update a task
  app.put('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then( task => task.update(req.body))
    .then(done => res.sendStatus(200))
    .catch(error => res.sendStatus(404))
  })

  return app
}
