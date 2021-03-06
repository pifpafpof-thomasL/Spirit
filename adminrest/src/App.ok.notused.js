import React from 'react';
import logo from './logo.svg';
import './App.css';

import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
// import { PostList, PostEdit, PostCreate } from './posts';
// import { UserList } from './users';
import { ProjetList } from './projets';
import { ConsultantList, ConsultantEdit } from './consultants';
import Dashboard from './Dashboard';

//import myApiRestClient from './restClient'; // either this one
//import myJsonRestClient from './myjsonClient'; // or this one

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/


const App = () => (
  <Admin  dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:4000')}>
  {/*<Admin  dashboard={Dashboard} restClient={myJsonRestClient('http://localhost:4000')}>*/}
    <img src={logo} className="App-logo" alt="logo" />  {/* not seen!? */}
    {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} />*/}
    <Resource name="projets" list={ProjetList}  icon={PostIcon} />
    <Resource name="consultants" list={ConsultantList} edit={ConsultantEdit} remove={Delete} icon={UserIcon} />
  </Admin>
);


export default App;
