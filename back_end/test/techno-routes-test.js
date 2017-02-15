'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/technos'

chai.use(chaiHttp)

// TEST DATAS
const techno_data_json = {
   "Nom":"technoName",
}

const techno2_data_json = {
   "Nom":"AutreTechnoNom",
}


describe('technos CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_techno= ''

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
      .send(techno_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/technos\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_techno = res.headers.location.slice(8)
         done()
      })
   })

   it('get the new techno', function(done) {
      chai.request(URL)
      .get(location_new_techno)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(techno_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_techno)
      .send(techno2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing techno', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(techno2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing techno', function(done) {
      chai.request(URL)
      .delete(location_new_techno)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails when delete non existing techno', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
