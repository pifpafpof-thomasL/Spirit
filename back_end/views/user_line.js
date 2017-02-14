'use strict'

const user_line_template = `
<tr>
	<td style='display:none;'>{{id_consultant}}</td>
	<td>{{Prenom}}</td>
	<td>{{Nom}}</td>
	<td>{{Email}}</td>
	<td>{{TelPortable}}</td>
	<td>{{TelFixe}}</td>
	<td><button data-user-edit={{id_consultant}}>Edit</button></td>
	<td><button data-user-delete={{id_consultant}}>Remove</button></td>
</tr>`

const users_list_template = `
<table width:200px>
  <thead>
	  <tr>
		  <th>Prenom</th>
		  <th>Nom</th>
		  <th>Email</th>
		  <th>Portable</th>
		  <th>Fixe</th>
		  <th colspan="2">Actions</th>
		</tr>
  </thead>
  <tbody>
  	{{#each users}}
	   ${user_line_template}
	{{/each}}
  </tbody>
</table>`

module.exports = {
   line: user_line_template,
   list: users_list_template
}
