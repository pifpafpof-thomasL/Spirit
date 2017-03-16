// server.js
'use strict'
const path = require('path');
const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(express.static('.'))
app.use(express.static('./public'))

app.use(bodyParser.urlencoded({ extended: false }))

// Required for admin-on-rest react front-end
const REACT_FRONT = "*"; // "http://localhost:3000"  // origine de requetes clientes d'un autre server http
// const to be displayed when the server is started
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", REACT_FRONT);
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});


// dès qu'une requête de type OPTIONS est envoyé
// le serveur répond qu'il accepte les méthodes GET, PUT, POST, DELETE et OPTIONS
// Required for admin-on-rest  react front-end, 
// otherwise server answer OPTIONS as if it was a GET, and so sends all JSON objetcs to the client
// admin-on-rest 1st ask for OPTIONS and then perform a GET
app.options('/*', function (request, response, next) {
  response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  response.sendStatus(204);
});

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
const Maitrise = require('./routes/maitrise')

// routes in module

app.use('/consultants', Consultant(db))
app.use('/clients', Client(db))
app.use('/taches', Tache(db))
app.use('/projets', Projet(db))
app.use('/technos', Techno(db))
app.use('/statuts', Statut(db))
app.use('/affectations', Affectation(db))
app.use('/imputations', Imputation(db))
app.use('/maitrises', Maitrise(db))


// routes in module
//
// TODO : il manque les assocations sous lib/modeles
// http://docs.sequelizejs.com/en/v3/docs/associations/
//
// rajouter les routes ici

const server = app.listen(4000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
  console.log("Access-Control-Allow-Origin: (react admin-on-rest server) ", REACT_FRONT)

})
