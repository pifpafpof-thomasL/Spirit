'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/clients'

chai.use(chaiHttp)

// TEST DATAS
const client_data_json = {
   "Nom":"clientName",
}

const client2_data_json = {
   "Nom":"AutreNomClient",
}


describe('clients CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_client= ''

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
      .send(client_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/clients\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_client = res.headers.location.slice(8)
         done()
      })
   })

   it('get the new client', function(done) {
      chai.request(URL)
      .get(location_new_client)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(client_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_client)
      .send(client2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing client', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(client2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing client', function(done) {
      chai.request(URL)
      .delete(location_new_client)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails when delete non existing client', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
