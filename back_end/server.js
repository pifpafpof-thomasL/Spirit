// server.js
'use strict'

const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('.'))
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false}))

// app.get('/', (req, res) => res.send('Welcome homepage'))
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})


const Consultant = require('./routes/consultant')
const Client = require('./routes/client')
const Tache = require('./routes/tache')
const Projet = require('./routes/projet')
const Techno = require('./routes/techno')
const Statut = require('./routes/statut')
const Affectation = require('./routes/affectation')
const Imputation = require('./routes/imputation')

// routes in module

app.use('/consultants', Consultant(db))
app.use('/clients', Client(db))
app.use('/taches', Tache(db))
app.use('/projets', Projet(db))
app.use('/technos', Techno(db))
app.use('/statuts', Statut(db))
app.use('/affectations', Affectation(db))
app.use('/imputations', Imputation(db))


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
