const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'Consultant') => {

  //REST for Consultants
  // Get/list all Consultant
  app.get('/', (req, res) => {
    db.Consultant.findAll({}).
      then((Consultants) => res.status(200).json(Consultants))
  })

  // Read single Consultant
  app.get('/:id', (req, res) => {
    db.Consultant.findById(req.params.id)
      .then((Consultant) => Consultant ?
        res.status(200).json(Consultant) :
        res.status(404).send('get: no such user'))
  })

  // Delete
  app.delete('/:id', (req, res) => {
    db.Consultant.findById(req.params.id)
      .then(Consultant => {
        Consultant.destroy()
        res.status(204).send("Info: Consultant deleted")  //no content for 204 return code
      })
      .catch(e => res.status(404).send('delete: no such user'))
  })

  // Creation
  app.post('/', (req, res) => {

    db.Consultant.create(req.body)
      .then(Consultant => {
        let loc = `${req.baseUrl}/${Consultant.id_consultant}`
        res.location(loc)
        res.status(201).send(Consultant)  // no need to send Consultant but could be useful for debug
      })
      .catch(e => {
        let err = "Error: Unable to create Consultant in DB (key is already in DB?)\n"
        console.log(err)
        res.status(409).send(err)
      })
  })

  // Update example http://localhost:3000/Consultant/7?Nom=mimi
  app.put('/:id', (req, res) => {
    db.Consultant.findById(req.params.id)
      .then( Consultant => Consultant.update(req.body) )
      .then( done => res.status(204).send('update ok') )
      .catch( e => res.status(404).send('update error') )
  });

  return app
}
