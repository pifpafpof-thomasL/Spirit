'use strict'

const express = require('express')
const app = express()
const inspect = require('util').inspect

let Maitrise = require('../lib/models').Maitrise

module.exports = (db, viewpath = 'Consultant') => {

  //REST for Consultants

  // Middleware de recherche par mots clés
  app.get('/', (req, res, next) => {
    if (req.query.q) {
      db.Consultant.findAndCountAll({
        where: { 
          $or: [
          {Nom: {$like: `%${req.query.q}%`}},
          {Prenom: {$like: `%${req.query.q}%`}}
          ]
        }
      })
      .then((consultant) => res.set("X-Total-Count", consultant.count).status(200).json(consultant.rows))
    } else {
      next()
    }
  })

  // Get/list all Consultants
  app.get('/', (req, res) => {
    db.Consultant.findAndCountAll({
      include: Maitrise
    }).
      then((Consultants) => {
        // let myRange = "items 0-" + Consultants.count + "/" + Consultants.count
        // console.log("Setting Content-Range = " + myRange)
        res
          .set("X-Total-Count", Consultants.count)
          //.set("Content-Range", "bytes 0-1023/2048") // works fine but incorrect 
          // .set("Content-Range", myRange) 
          .status(200)
          .json(Consultants.rows)
      })
      .catch(e => console.log(e))
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

        // added by thomas please consider instead of 
        //.send(Consultant) 
        // rather	.json({ id: `${idxxx}` })  // json/id is required for Adminonrest HMI update

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
      .then(Consultant => Consultant.update(req.body))
      .then(done => res.status(200).json({id: `${req.params.id}`}))
      .catch(e => res.status(404).send('update error'))
  });

  return app
}
