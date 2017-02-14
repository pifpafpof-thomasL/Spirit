'use strict'

const user_line_template = `
<tr>
	<td style='display:none;'>{{_id}}</td>
	<td>{{firstname}}</td>
	<td>{{lastname}}</td>
	<td><button data-user-edit={{_id}}>Edit</button></td>
	<td><button data-user-delete={{_id}}>Remove</button></td>
</tr>`

const users_list_template = `
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

module.exports = {
   line: user_line_template,
   list: users_list_template
}
