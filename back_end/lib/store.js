'use strict'

function Store(bus) {
	this.state = {}
   this.bus = bus
}

Store.prototype.set = function (records) {
	records.forEach(record => {
		this.state[record['_id']] = record
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


Store.prototype.deleteUser = function (_id) {
	delete this.state[_id]
}

Store.prototype.get_user = function (_id) {
	return this.state[_id]
}

Store.prototype.addUser = function (_id, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[_id] = { _id, firstname, lastname }
	return _id
}

Store.prototype.updateUser = function (_id, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[_id] = { _id, firstname, lastname }
	return _id
}

module.exports = Store
