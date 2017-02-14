const inspect = require('object-inspect')
const events = require('pubsub')

function Store() {
	this.state = {}
}

Store.prototype.set = function (records) {
	records.forEach(record => {
		this.state[record['_id']] = record
	})
	events.publish('reset', this)

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

var store = new Store()

const Views = require('./views/view.js')
var countComposant = new Views.Count('count', events)
var listComposant = new Views.List('myUserList', events)

window.addEventListener('haschanged', () => {
	console.log("Location hash()", windows.location.hash())
	document.body.innerHTML = "toto"
})

function isEmpty(val) {
	return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function save_user(form) {
	if (!isEmpty(form._id.value)) {
		update_user(form);
	} else {
		add_user(form);
	}
}

function add_user(form) {
	var payload = {};
	payload['firstname'] = form.firstname.value;
	payload['lastname'] = form.lastname.value;

	var myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');

	var myInit = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(payload)
	};

	var myRequest = new Request('users', myInit);

	fetch(myRequest).then(function (res) {
		if (res.ok) {
			var _id = res.headers.get('Location');
			store.addUser(_id, payload)
			reset_form();
		}
	});
}


function update_user(form) {
	var _id = form._id.value;
	var payload = {};
	payload['_id'] = _id;
	payload['firstname'] = form.firstname.value;
	payload['lastname'] = form.lastname.value;

	var myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json');

	var myInit = {
		method: 'PUT',
		headers: myHeaders,
		body: JSON.stringify(payload)
	};

	var myRequest = new Request('users', myInit);

	fetch(myRequest).then(function (res) {
		if (res.ok) {
			store.updateUser(_id, payload)
		}
	});

}


function delete_user(_id) {
	var myHeaders = new Headers();
	var myInit = {
		method: 'DELETE',
		headers: myHeaders
	};

	var myRequest = new Request('users/' + _id, myInit);

	fetch(myRequest).then(function (res) {
		if (res.ok) {
			store.deleteUser(_id)
			document.getElementById("count").innerText = 'User count: ' + store.getCount()
		}
	});
}

function reset_form() {
	var form = document.getElementById("myForm");
	form.reset();
	form._id.value = null;
}

function edit_user(_id) {

	let user = store.get_user(_id)
	let form = document.getElementById('myForm');
	form._id.value = user._id;
	form.firstname.value = user.firstname;
	form.lastname.value = user.lastname;
}

document.addEventListener("DOMContentLoaded", function (event) {
	load_users();
	var myForm = document.getElementById('myForm')
	myForm.onsubmit = function () {
		save_user(this)
		return false
	}
})

function load_users() {
	fetch('consultants')
      .then(res => res.json())
		.then(users => store.set(users))
		.catch(function (error) {
			console.log('load_users(): problem with your code? ' + error.message);
		})
}
