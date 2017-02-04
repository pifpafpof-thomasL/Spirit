'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/affectations'

chai.use(chaiHttp)

// TEST DATAS
const affectation_data_json = {
   "id_Consultant":2,
   "id_Projet":45,
   "Pourcentage": 50
}

const affectation2_data_json = {
   "id_Consultant":2,
   "id_Projet":45,
   "Pourcentage": 99
}


describe('affectations CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_affectation= ''

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
      .send(affectation_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/affectations\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_affectation = res.headers.location.slice(13)
         done()
      })
   })

   it('get the new affectation', function(done) {
      chai.request(URL)
      .get(location_new_affectation)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(affectation_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_affectation)
      .send(affectation2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing affectation', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(affectation2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing affectation', function(done) {
      chai.request(URL)
      .delete(location_new_affectation)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails when delete non existing affectation', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
