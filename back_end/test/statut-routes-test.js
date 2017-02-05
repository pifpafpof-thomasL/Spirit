'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/statuts'

chai.use(chaiHttp)

// TEST DATAS
const statut_data_json = {
   "Nom":"statutName",
}

const statut2_data_json = {
   "Nom":"AutreTechnoNom",
}


describe('statuts CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_statut= ''

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
      .send(statut_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/statuts\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_statut = res.headers.location.slice(8)
         done()
      })
   })

   it('get the new statut', function(done) {
      chai.request(URL)
      .get(location_new_statut)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(statut_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_statut)
      .send(statut2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing statut', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(statut2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing statut', function(done) {
      chai.request(URL)
      .delete(location_new_statut)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails when delete non existing statut', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
