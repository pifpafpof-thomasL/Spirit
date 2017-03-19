'use strict'

// TODO : vérifier que id_consultant et id_projet existent !!
// TODO : update -> only certain values?

const express = require('express')
const app = express()

module.exports = (db, viewpath = 'Affectation') => {

	// Middleware de recherche par mots clés
	app.get('/', (req, res, next) => {
		if (req.query.q) {
			db.Affectation.findAndCountAll({
				where: {
					$or: [
						{ id_Consultant: { $like: `%${req.query.q}%` } },
						{ Pourcentage: { $like: `%${req.query.q}%` } },
						{ id_Projet: { $like: `%${req.query.q}%` } }
					]
				}
			})
				.then((Affectation) => res
					.set("X-Total-Count", Affectation.count)
					.status(200)
					.json(Affectation.rows))
		} else {
			next()
		}
	})

	// list all affectations
	app.get('/', (req, res) => {

		db.Affectation.findAndCountAll({}).
			then((Affectation) => {
				let myRange = "items 0-" + Affectation.count + "/" + Affectation.count
				console.log("Setting Content-Range = " + myRange)
				res
					.set("X-Total-Count", Affectation.count)
					//.set("Content-Range", "bytes 0-1023/2048") // works fine but incorrect 
					.set("Content-Range", myRange)
					.status(200)
					.json(Affectation.rows)
			})
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
			.then(affectation => {
				const id = affectation.dataValues.id
				res.location(`${req.baseUrl}/${id}`)
					.status(201)
					.json({ id: `${id}` })  // json/id is required for Adminonrest HMI update
			})
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
			.then(done => res.status(200).json({ id: `${req.params.id}` }))
			.catch(error => res.sendStatus(404))
	})

	return app
}
