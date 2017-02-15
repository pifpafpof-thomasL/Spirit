'use strict'

// TODO : vérifier que id_consultant et id_projet existent !!
// TODO : update -> only certain values?

const express = require('express')
const app = express()

module.exports = (db, viewpath = 'Affectation') => {

	// list all affectations
	app.get('/', (req, res) => {
		db.Affectation.findAll()
		.then(affectation => res.status(200).json(affectation))
		.catch(error => res.sendStatus(404))
	})

	// find one affectation
	app.get('/:id', (req, res) => {
		db.Affectation.findById(req.params.id)
		.then(affectation => affectation ?
			res.status(200).json(affectation) :
			res.sendStatus(404))
		.catch(error => res.send('Random text to signal error'))
	})


	// create a new affectation
	app.post('/', (req, res) => {
		db.Affectation.create(req.body)
		.then(affectation => res.location(`/affectations/${affectation.dataValues.id_Affectation}`).sendStatus(201))
		.catch(error => res.sendStatus(404))
	})

	// delete an affectation
	app.delete('/:id', (req, res) => {
		db.Affectation.findById(req.params.id)
		.then(affectation => affectation.destroy())
		.then(done => res.sendStatus(204))
		.catch(error => res.sendStatus(404))
	})

	// update an affectation
	app.put('/:id', (req, res) => {
		db.Affectation.findById(req.params.id)
		.then(affectation => affectation.update(req.body))
		.then(done => res.sendStatus(204))
		.catch(error => res.sendStatus(404))
	})

	return app
}
