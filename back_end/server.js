// server.js
const express = require('express')
const app = express()
const db = require(`${__dirname}/lib/models/index.js`)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('.'))

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => res.send('Welcome homepage'))
//app.get('/index', (req, res) => res.sendFile(`${__dirname}/index.html`))

const Consultant = require('./routes/Consultant')
// routes in module
app.use('/Consultant', Consultant(db))

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