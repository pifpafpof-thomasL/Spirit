'use strict'

const express = require('express')
const app = express()

const inspect = require('util').inspect

module.exports = (db, viewpath = 'projets') => {

   app.get('/', (req, res) => {
      db.Projet.findAll({})
      .then((Projets) => res.json(Projets))
   })

   app.get('/:id', (req, res) => {
      db.Projet.find({ where: { id_projet: req.params.id } })
      .then((Projet) => Projet ?
         res.json(Projet) :
         res.status(404).json({ error: "unknown Projet" })
      )
   })

   app.delete('/:id', (req, res) => {
      db.Projet.findById(req.params.id)
      .then( (projet) => projet.destroy() )
      .then( () => res.status(204).send() )
      .catch(e => res.status(404).send('no such user'))
   })

   app.post('/', (req, res) => {
      console.log(inspect(req.body))
      db.Projet.create(req.body)
      .then( () => res.status(204).send('ok') )
      .catch( e => {
         console.log(inspect(e))
         res.status(404).send('error')
      })
   })


   return app
}
