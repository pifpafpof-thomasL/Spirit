// server.js
const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('.'))

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('Welcome homepage'))
app.get('/index', (req, res) => res.sendFile(`${__dirname}/index.html`))

//
// TODO : il manque les assocations sous lib/modeles
// http://docs.sequelizejs.com/en/v3/docs/associations/
//

// rajouter les routes ici

//REST for Consultants
app.get('/Consultants', (req, res) =>{
  db.Consultant.findAll({}).
    then((Consultants) => res.json(Consultants))
})

app.get('/Consultants/:id', (req, res) =>{
  db.Consultant.find({
    where: { id_consultant : req.params.id }
  })
  .then((Consultant) => Consultant ? 
      res.json(Consultant) : 
      res.status(404).json({error: "unknown Consultant"}))
})

const server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})