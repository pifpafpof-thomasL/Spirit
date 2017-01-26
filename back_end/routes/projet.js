'use strict'

const inspect = require('util').inspect

module.exports = (app, db, viewpath = 'Projet') => {

   app.set("views", require('path').join(__dirname, "views"))
   app.set("view engine", "hbs") 

   app.get('/', (req, res) => {
      db.Projet.findAll({})
      .then((Projets) => res.json(Projets))
   })

   // READ single Projet
   app.get('/:id', (req, res) => {
      db.Projet.find({ where: { id_consultant: req.params.id } })
      .then((Projet) => Projet ?
         res.json(Projet) :
         res.status(404).json({ error: "unknown Projet" })
      )
   })

   // delete
   app.delete('/:id', (req, res) => {
      db.Projet.findById(req.params.id)
      .then((Projet) => {
         Projet.destroy()
         res.redirect('/')   // list all Projet
      })
      .catch(e => res.status(404).send('no such user'))
   })

   app.post('/', (req, res) => {
      db.Projet.create(req.body)
      //.then(Projet => Projet.setAuthor(req.user))
      .then(Projet => res.redirect(`${req.baseUrl}/${Projet.id_consultant}`))
      .catch(e => res.status(404).send(`Unable to create Projet ${Projet.id_consultant}`))
   })

   app.get('/new', (req, res) => {
      res.render('projet/new')
   })

   return app
}
