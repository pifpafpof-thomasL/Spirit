'use strict'

const handlebars = require('handlebars')
const user_template = require('./user_line.js')
const lines_compiled = handlebars.compile(user_template.list);
const line_compiled = handlebars.compile(user_template.line);

class MyView {
	constructor(elementId, events) {
		const self = this

		events.subscribe('reset', self.render.bind(self))
		events.subscribe('add', self.add.bind(self))
		events.subscribe('delete', self.delete.bind(self))
		events.subscribe('update', self.update.bind(self))

		document.addEventListener("DOMContentLoaded", 
			x => {
			this.mountPoint = document.getElementById(elementId)
			this.mountPoint.addEventListener("click", function (e) {
				e.stopPropagation(); 
				if (e.target && e.target.nodeName == "BUTTON") {
					if (e.target.innerHTML == "Edit") 
						edit_user(e.target.getAttribute('data-user-edit'))
					else
						delete_user(e.target.getAttribute('data-user-delete'))
				}
			})
		})
	}
}


class MycountView extends MyView {
	constructor(elementId, events) {
		super(elementId, events)
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
      return store
   }
}

class MylistView extends MyView {
	constructor(elementId, events) {
		super(elementId, events)
	}

	render(store) {
		this.mountPoint.innerHTML = lines_compiled({ users: store.values() });
		return store
	}

	add(user) {
		let node = document.createElement('tr')
		let lhtml = line_compiled(user);
		node.innerHTML = lhtml
		let tbody = document.getElementsByTagName("tbody")[0];
		tbody.appendChild(node);

		return user
	}

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

module.exports = {
   Count: MycountView,
   List: MylistView,
}
