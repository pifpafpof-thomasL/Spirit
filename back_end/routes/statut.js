const express = require('express')
const app = express()

module.exports = (db, viewpath = 'Statut') => {

	// list all status
	app.get('/', (req, res) => {
		db.Statut.findAll()
		.then(statut => res.status(200).json(statut))
		.catch(error => res.sendStatus(404))
	})

	// find one status
	app.get('/:id', (req, res) => {
		db.Statut.findById(req.params.id)
		.then((statut) => statut ?
			res.status(200).json(statut) :
			res.sendStatus(404))
		.catch(error => res.send('Unknown error'))
	})

	// create new statut
	app.post('/', (req, res) => {
		db.Statut.create(req.body)
		.then(statut => res.location(`/statut/${req.body.id_Statut}`).sendStatus(201))
		.catch(error => {
			// Works but does 2 requests to the db to verify
      if (db.Statut.findById(req.body.id_Statut)) {
        return res.status(409).send('This statut already exists')
      }
      res.sendStatus(404)
		})
	})

	// delete a statut
	app.delete('/:id', (req, res) => {
		db.Statut.findById(req.params.id)
		.then(statut => statut.destroy())
		.then(done => res.sendStatus(200))
		.catch(error => res.sendStatus(404))
	})
	
	// update a statut
	app.put('/:id', (req, res) => {
		db.Statut.findById(req.params.id)
		.then(statut => statut.update(req.body))
		.then(done => res.sendStatus(200))
		.catch(error => res.sendStatus(404))
	})

	return app
}
