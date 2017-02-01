'use strict'

const express = require('express')
const app = express()

module.exports = (db, viewpath = 'Affectation') => {

	// list all effectations
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

	// Verify if consultant and projet exist in order to affect them
	let verifyForeignKeysExist = function (model, id_model) {
		return db.model.findById(id_model)
		.then(model => {
			if (!model){
				throw error
			}
			return true
		})
		.catch(error => res.status(409).send(`This ${model} does not exist`))
	}

	// create a new affectation
	app.post('/', (req, res) => {
		let verifyForeignKeysExist = function(model, id_model){
			return db.model.findById(id_model)
			.then(model => {
				if (!model){
					throw error
				}
				return true
			})
			.catch(error => res.status(409).send(`This ${model} does not exist`))
		}
		// console.log(req.body)
		verifyForeignKeysExist(Consultant, id_consultant)
		.then(consultantOk => verifyForeignKeysExist(Projet, id_projet))
		.then(projetOk => db.Affectation.create(req.body))
		.then(affectation => res.location(`/affectation/${affectation.dataValues.id_Affectation}`).sendStatus(201))
		.catch(error => res.sendStatus(404))
	})

	return app
}