'use strict'

const express = require('express')
const app = express()

const inspect = require('util').inspect

module.exports = (db, viewpath = 'imputation') => {

   app.get('/', (req, res) => {
      db.Imputation.findAll({})
      .then((imputations) => res.status(200).json(imputations))
      .catch( e => res.status(404).send('db access error') )
   })

   app.get('/:id', (req, res) => {
      db.Imputation.find({ where: { id_imputation: req.params.id } })
      .then((imputation) => imputation ?
         res.status(200).json(imputation) :
         res.status(404).send('Not Found')
      )
   })

   app.delete('/:id', (req, res) => {
      db.Imputation.findById(req.params.id)
      .then( (imputation) => imputation.destroy() )
      .then( () => res.status(200).send('delete ok') )
      .catch(e => res.status(404).send('error'))
   })

   app.post('/', (req, res) => {
      db.Imputation.create(req.body)
      .then( imputation => {
         const id_imputation = imputation.dataValues.id_Imputation
         res.status(201)
            .append('Location', `${req.baseUrl}/` + id_imputation)
            .send('created ok')
      })
      .catch( e => { res.status(404).send('error') })
   })

   app.put('/:id', (req, res) => {
      db.Imputation.findById(req.params.id)
      .then( (imputation) => imputation.update(req.body) )
      .then( done => res.status(200).json({id: `${req.params.id}`}))
      .catch( e => res.status(404).send('error') )
   })

   return app
}
