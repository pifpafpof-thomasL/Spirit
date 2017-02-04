'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/consultants'

chai.use(chaiHttp)

// TEST DATAS
const consultant_data_json = {
   "Prenom":"consultantPrenom",
   "Nom":"consultantName",
}

const consultant2_data_json = {
   "Prenom":"AutrePreNom",
   "Nom":"AutreNom",
}


describe('consultants CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_consultant= ''

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
      .send(consultant_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/consultants\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_consultant = res.headers.location.slice(12)
         done()
      })
   })

   it('get the new consultant', function(done) {
      chai.request(URL)
      .get(location_new_consultant)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(consultant_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_consultant)
      .send(consultant2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing consultant', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(consultant2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing consultant', function(done) {
      chai.request(URL)
      .delete(location_new_consultant)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails when delete non existing consultant', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
