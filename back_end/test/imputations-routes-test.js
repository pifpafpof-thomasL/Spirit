'use strict'

const inspect = require('util').inspect

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const URL = 'http://localhost:3000/imputations'

chai.use(chaiHttp)

//TEST DATAS
const imputation_data_json = {
   "id_Consultant":2,
   "id_Tache":42,
   "Pourcentage":90,
   "DateDebut":"2009-10-04T00:00:00.000Z",
   "DateFin":"2011-10-04T00:00:00.000Z",
}

const imputation2_data_json = {
   "id_Consultant":2,
   "id_Tache":42,
   "Pourcentage":30,
   "DateDebut":"2009-10-04",
   "DateFin":"2011-10-04",
}


describe('imputations CRUD routes', function() {
   // global var initialized in the add test
   // and used in update and delete tests
   let location_new_imputation= ''

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
      .send(imputation_data_json)
      .end(function (err, res) {
         expect(res.headers).to.have.property('location')
         expect(res.headers.location).to.match(/^\/[0-9]+$/)
         expect(res).to.have.status(201)
         location_new_imputation = res.headers.location
         done()
      })
   })

   it('get the new imputation', function(done) {
      chai.request(URL)
      .get(location_new_imputation)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         expect(res.body).to.include(imputation_data_json)
         done()
      })
   })

   it('update', function(done) {
      chai.request(URL)
      .put(location_new_imputation)
      .send(imputation2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(204)
         done()
      })
   })

   it('fails updating non existing imputation', function(done) {
      chai.request(URL)
      .put('/wrongId')
      .send(imputation2_data_json)
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })

   it('delete an existing imputation', function(done) {
      chai.request(URL)
      .delete(location_new_imputation)
      .end(function(err, res) {
         expect(res).to.have.status(200)
         done()
      })
   })

   it('fails when delete non existing imputation', function(done) {
      chai.request(URL)
      .delete('/notAnId')
      .end(function(err, res) {
         expect(res).to.have.status(404)
         done()
      })
   })
})
