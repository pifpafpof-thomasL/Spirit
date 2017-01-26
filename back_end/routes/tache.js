const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'Tache') => {

  //list all tasks
  app.get('/', (req, res) => {
    db.Tache.findAll()
    .then(tache => res.json(tache))
  })

  //find one particular task
  app.get('/:id', (req, res) => {
    db.Tache.findById(req.params.id)
    .then((task) => res.json(task))
    .catch(e => res.status(404).send("This task doesn't exist"))
  })

  //create a new task
  //app.post('/', (req, res) => {
    
  //})

  return app
}
