// server.js
const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('.'))

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('Welcome homepage'))

const consultant = require('./routes/consultant')
const Client = require('./routes/client')
const tache = require('./routes/tache')
const Projet = require('./routes/projet')
// routes in module

app.use('/client', Client(db))
app.use('/tache', tache(db))
app.use('/projets', Projet(db))
app.use('/consultant', consultant(db))




// routes in module
//
// TODO : il manque les assocations sous lib/modeles
// http://docs.sequelizejs.com/en/v3/docs/associations/
//

// rajouter les routes ici

const server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
