const inspect = require('object-inspect')
const events = require('pubsub')
const handlebars = require('handlebars')

//////////// Handlebar templates ////////////////////////
const user_line_template = `
<tr>
	<td style='display:none;'>{{_id}}</td>
	<td>{{firstname}}</td>
	<td>{{lastname}}</td>
	<td><button data-user-edit={{_id}}>Edit</button></td>
	<td><button data-user-delete={{_id}}>Remove</button></td>
</tr>`

const users_lines_template = `
<table width:200px>
  <thead>
	  <tr>
		  <th>Firstname</th>
		  <th>Lastname</th>
		  <th colspan="2">Actions</th>
		</tr>
  </thead>
  <tbody>
  	{{#each users}}
	${user_line_template}
	{{/each}}
  </tbody>
</table>`

var lines_compiled = handlebars.compile(users_lines_template);
var line_compiled = handlebars.compile(user_line_template);
////////////end of hanlebar template //////////////////

/*
//////////socket.io/////////
const io = require('socket.io-client')
var socket = io.connect('http://localhost:3000'); // same port as server
// socket.on('newConnexion', function (data) {
// 	console.log('newConnexion:'+ data);
// 	//socket.emit('reload', { msg: 'you should reload if I tell you' });
// });

socket.on('newUser!', function (user) {
	//console.log('socket.on newUser ' + user);
	events.publish('add', JSON.parse(user))
});

socket.on('updateUser!', function (user) {
	//console.log('socket.on updateUser ' + user);
	events.publish('update', JSON.parse(user))
});

socket.on('deleteUser!', function (_id) {
	//console.log('socket.on deleteUser! ' + _id);
	events.publish('delete', _id)
});
///////////end of socket.io/////////////////
*/

//////////////
// local store to record all users info to display
function Store() {
	this.state = {}
}

Store.prototype.set = function (records) {
	records.forEach(record => {
		this.state[record['_id']] = record
	})
	events.publish('reset', this)

	//return this.state for .then
	return this  // .then now awaits a Store object
}

Store.prototype.values = function () {
	return Object.keys(this.state).map(key => this.state[key])
}

Store.prototype.getCount = function () {
	return this.values().length
}


Store.prototype.deleteUser = function (_id) {
	delete this.state[_id]
	//events.publish('delete', _id)  // done by socket.on from server
}

Store.prototype.get_user = function (_id) {
	return this.state[_id]
}


Store.prototype.addUser = function (_id, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[_id] = { _id, firstname, lastname }
	//events.publish('add', this.state[_id])  // now done by socket.on('newUser!',
	// more efficient than below
	//events.publish('add', this)
	return _id
}


Store.prototype.updateUser = function (_id, payload) {
	let firstname = payload['firstname']
	let lastname = payload['lastname']
	this.state[_id] = { _id, firstname, lastname }
	//events.publish('update', this.state[_id])  // done by socket.on
	return _id
}



var store = new Store()

//function Store() 
/* Equivalent to
class Store {
	constructor() {
		this.state =
	}
	set
}
*////// End of store /////////////////


//////////////View classes //////////////////
class myView {
	constructor(elementId) {
		var self = this  // otherwise this does not exist in addEventListener

		// register for the event which will trigger render
		events.subscribe('reset', self.render.bind(self))
		events.subscribe('add', self.add.bind(self))
		events.subscribe('delete', self.delete.bind(self))
		events.subscribe('update', self.update.bind(self))

		document.addEventListener("DOMContentLoaded", 
			x => {   // since ES6 is used no need to use "self"

			this.mountPoint = document.getElementById(elementId)

			this.mountPoint.addEventListener("click", function (e) {
				e.stopPropagation();  // to stop bubbling/capture  on parent/child DOM elements
				// only take care of click on button:
				if (e.target && e.target.nodeName == "BUTTON") {
					if (e.target.innerHTML == "Edit")  // Edit button
						edit_user(e.target.getAttribute('data-user-edit'))
					else // Delete button
						delete_user(e.target.getAttribute('data-user-delete'))
				}
			})
		})
	}
}


// to display the sum of users (bottom of the page)
class mycountView extends myView {
	constructor(elementId) {
		super(elementId)
		this.count = 0
	}

	_setinnerText() {
		this.mountPoint.innerText = 'User count: ' + this.count
	}

	render(store) {
		this.count = store.getCount()
		this._setinnerText()
		return store
	}

	add(whatever) {
		this.count += 1
		this._setinnerText()
		return store
	}

	delete(whatever) {
		this.count -= 1
		this._setinnerText()
		return store
	}

	update(whatever) {
		//nothing to do on the counter
	}
}

//////////////
class mylistView extends myView {
	constructor(elementId) {
		super(elementId)

	}

	render(store) {

		// NEW: using handlebars template engine to display the list
		this.mountPoint.innerHTML = lines_compiled({ users: store.values() });

		// set edit event   // now DONE in ListViewConstructor ! addEventListener("click" more global
		// const editButtons = Array.from(document.querySelectorAll('button[data-user-edit]'))
		// editButtons.forEach(editButton => {
		// 	editButton.onclick = function (e) {
		// 		edit_user(this.getAttribute('data-user-edit'))
		// 	}
		// })
		// // set delete event
		// const delButtons = Array.from(document.querySelectorAll('button[data-user-delete]'))
		// delButtons.forEach(delButton => {
		// 	delButton.onclick = function (e) {
		// 		delete_user(this.getAttribute('data-user-delete'))
		// 	}
		// })
		return store
	}


	add(user) {
		let node = document.createElement('tr')
		let lhtml = line_compiled(user);
		node.innerHTML = lhtml
		let tbody = document.getElementsByTagName("tbody")[0];
		tbody.appendChild(node);

		// now DONE in ListViewConstructor ! addEventListener("click" more global
		//let be = document.querySelector('button[data-user-edit=\"' + user._id + '\"]')
		// be.onclick = function (e) {
		// 	edit_user(user._id)
		// }
		// let bd = document.querySelector('button[data-user-delete=\"' + user._id + '\"]')
		// bd.onclick = function (e) {
		// 	delete_user(user._id)
		// }

		return user  // or user
	}

	// using DOM directly for fun, too much work, best to use hbs !!
	add_old_depricated(user) {  // just for testing

		// without using handlebars template, we use DOM :
		let tabUsers = document.getElementsByTagName("tbody")[0];
		let tr = document.createElement('tr')
		tabUsers.appendChild(tr)
		let td0 = document.createElement('td')
		td0.innerHTML = user._id
		td0.style = 'display:none;'
		tr.appendChild(td0)
		let td1 = document.createElement('td')
		td1.innerHTML = user.firstname
		tr.appendChild(td1)
		let td2 = document.createElement('td')
		td2.innerHTML = user.lastname
		tr.appendChild(td2)

		let td3 = document.createElement('td')
		tr.appendChild(td3)
		let editButton = document.createElement("BUTTON")
		td3.appendChild(editButton)
		let t = document.createTextNode("Edit")
		editButton.appendChild(t)
		editButton.setAttribute('data-user-edit', user._id)

		let td4 = document.createElement('td')
		tr.appendChild(td4)
		let delButton = document.createElement("BUTTON")
		td4.appendChild(delButton)
		let t2 = document.createTextNode("Delete")
		delButton.appendChild(t2)
		delButton.setAttribute('data-user-delete', user._id)

		editButton.onclick = function (e) {
			edit_user(this.getAttribute('data-user-edit'))
		}
		delButton.onclick = function (e) {
			delete_user(this.getAttribute('data-user-delete'))
		}
		return user  // or user
	}

	// only removes the right row
	delete(_id) {
		let b = document.querySelector('button[data-user-delete=\"' + _id + '\"]')
		b.parentElement.parentElement.remove()  // remove the right table line
	}

	update(user) {
		let b = document.querySelector('button[data-user-delete=\"' + user._id + '\"]')
		let tr = b.parentElement.parentElement
		let tdfirstname = tr.getElementsByTagName("td")[1];
		tdfirstname.innerHTML = user.firstname
		let tdlastname = tr.getElementsByTagName("td")[2];
		tdlastname.innerHTML = user.lastname
		reset_form();
	}
}

// Version avec fonctions de mylistView
// non appelées, ici pour test
/*
let listView = {}
listView.init = function (elementId) {
	//this.store = null
	//this.mountPoint = document.getElementById(elementId)
	document.addEventListener("DOMContentLoaded", (event) => {
		this.mountPoint = document.getElementById(elementId)
	})
}

listView.render = function (store) {
	this.mountPoint.innerHTML = user_line_compiled_template({ users: store.values() });
// and more
}
//listView.init('myUserList')
*/
// fin fonctions listView

// version avec des "class"
var countComposant = new mycountView('count')
var listComposant = new mylistView('myUserList')
////////////// end of View classes //////////////////


// test du changement d'URL avec tag # en plus
window.addEventListener('haschanged', () => {
	console.log("Location hash()", windows.location.hash())
	document.body.innerHTML = "toto"
})

// var lines_compiled = handlebars.compile(users_lines_template);
// var line_compiled = handlebars.compile(user_line_template);

/////////////// HMI functions that triggers messages to server ////////////////////
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
			//console.log('_id =' + _id);
			store.addUser(_id, payload)
			reset_form();
			//load_users();
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
			//reset_form();  // reset form before full reload
			//load_users(); // full reload, see below better function
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
			//load_users();  // NO, let's avoid reloading everything...
			// instead  remove from store the right _id
			store.deleteUser(_id)

			// remove only selected user from list view HMI
			// let b = document.querySelector('button[data-user-edit=\"' + _id + '\"]')
			// b.parentElement.parentElement.remove()  // remove the right table line 

			// and let's update count view
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
	var form = document.getElementById('myForm');
	form._id.value = user._id;
	form.firstname.value = user.firstname;
	form.lastname.value = user.lastname;
}

/////////////// /////////////// /////////////// ///////////////
// First time page is loaded:
document.addEventListener("DOMContentLoaded", function (event) {
	load_users();
	var myForm = document.getElementById('myForm')
	myForm.onsubmit = function () {
		save_user(this)
		return false   // arrêt de l'envoie du formulaire
	}
})

function load_users() {
	// fetch 
	// then store.set
	// nb: inside publish('reset', store) is inside store.set

//	fetch('users').then(res => res.json())
	fetch('consultants').then(res => res.json())
		.then(users => store.set(users))
		//.then(store => listComposant.render(store))  // previous version
		//.then(store => countComposant.render(store))
		.catch(function (error) {
			console.log('load_users(): problem with your code? ' + error.message);
		})
}
/////////////// end of everything! ////////////////////
