const express = require('express')
const app = express()
const inspect = require('util').inspect
module.exports = (db, viewpath = 'Consultant') => {

  //REST for Consultants
  // Get all Consultant
  app.get('/', (req, res) => {
    db.Consultant.findAll({}).
      then((Consultants) => res.json(Consultants))
  })

  // READ single Consultant
  app.get('/:id', (req, res) => {
    db.Consultant.find({
      where: { id_consultant: req.params.id }
    })
      .then((Consultant) => Consultant ?
        res.json(Consultant) :
        res.status(404).json({ error: "unknown Consultant" }))
  })

  // delete
  app.delete('/:id', (req, res) => {
    db.Consultant.findById(req.params.id)
      .then((Consultant) => {
        Consultant.destroy()
        Consultant.redirect('/')   // list all Consultant
      })
      .catch(e => res.status(404).send('no such user'))
  })

  app.post('/', (req, res) => {
    db.Consultant.create(req.body)
      //.then(Consultant => Consultant.setAuthor(req.user))
      .then(Consultant =>
        res.redirect(`${req.baseUrl}/${Consultant.id_consultant}`))
//      .catch(e => res.status(404).
//          send(`Unable to create Consultant ${Consultant.id_consultant}`))
  })

  return app
}
