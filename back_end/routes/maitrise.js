'use strict'

const express = require('express')
const app = express()
const inspect = require('util').inspect

let Techno = require('../lib/models').Techno

module.exports = (db, viewpath = 'Maitrise') => {

  //REST for Maitrises
  app.get('/', (req, res) => {
    db.Maitrise.findAndCountAll({
      include: Techno
    }).
      then((Maitrises) => {
        res.set("X-Total-Count", Maitrises.count)
          .status(200)
          .json(Maitrises.rows)
      })
      .catch(e => console.log(e))
  })
  
  return app
}