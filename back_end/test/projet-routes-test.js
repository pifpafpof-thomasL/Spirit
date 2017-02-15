'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/projets'

chai.use(chaiHttp)

// TEST DATAS
const projet_data_json = {
   "Nom":"projetName",
   "DateDebut":"2009-10-04T00:00:00.000Z",
   "DateFin":"2011-10-04T00:00:00.000Z",
   "Adm":12,
   "id_Client":1
}

const projet2_data_json = {
   "Nom":"AutreNom",
   "DateDebut":"2009-10-05",
   "DateFin":"2011-10-05",
   "Adm":12,
   "id_Client":1
}


describe('projets CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_projet= ''

   it('get collection silently', function(done) {
      chai.request(URL)
      .get('/')
      .end(function (err, res) {
         expect(res).to.have.status(200)
         done()
      })
   })

   it('add', function(done) {
      chai.request(URL)
      .post('/')
      .send(projet_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_projet = res.headers.location
         done()
      })
   })

   it('get the new projet', function(done) {
      chai.request(URL)
      .get(location_new_projet)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(projet_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_projet)
      .send(projet2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing projet', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(projet2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing projet', function(done) {
      chai.request(URL)
      .delete(location_new_projet)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         done()
      })
   })

   it('fails when delete non existing projet', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})

