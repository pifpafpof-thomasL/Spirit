'use strict'

const inspect = require('util').inspect

function Store(bus) {
	this.state = {}
   this.bus = bus
}

Store.prototype.set = function (records) {
	records.forEach(record => {
		this.state[record['id_consultant']] = record
	})
	this.bus.publish('reset', this)

	return this
}

Store.prototype.values = function () {
	return Object.keys(this.state).map(key => this.state[key])
}

Store.prototype.getCount = function () {
	return this.values().length
}

Store.prototype.deleteUser = function (id_consultant) {
	delete this.state[id_consultant]
}

Store.prototype.get_user = function (id_consultant) {
	return this.state[id_consultant]
}

Store.prototype.addUser = function (id_consultant, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[id_consultant] = { id_consultant, firstname, lastname }
	return id_consultant
}

Store.prototype.updateUser = function (id_consultant, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[id_consultant] = { id_consultant, firstname, lastname }
	return id_consultant
}

module.exports = Store
