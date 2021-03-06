import React from 'react';
import './App.css';

import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';
import DashIcon from 'material-ui/svg-icons/action/dashboard';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import { ProjetList, ProjetEdit } from './projets';
import { ConsultantList, ConsultantEdit } from './consultants';
import { AffectationList, AffectationEdit, AffectationCreate } from './affectations';
import Dashboard from './Dashboard';

import customRoutes from './customRoutes';
import MyLayout from './MyLayout';

/* // original react app!
class App extends Component {
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
  // {/*<Admin  dashboard={Dashboard} restClient={myJsonRestClient('http://localhost:4000')}>*/ }
  /*
    < Admin dashboard= { Dashboard } appLayout= { MyLayout } title= { "Spirit"}
  customRoutes = { customRoutes }
  restClient = { jsonServerRestClient('http://localhost:4000')} >
  */
  <Admin dashboard={Dashboard}
    title={"Spirit"}
    appLayout={MyLayout}
    customRoutes={customRoutes}
    restClient={jsonServerRestClient('http://localhost:4000')}>

    {/*// at least one Resource is required but will be hidden by MyLayout*/}
    < Resource name="projets" list={ProjetList} edit={ProjetEdit} icon={PostIcon} />
    <Resource name="consultants" list={ConsultantList}
      edit={ConsultantEdit} remove={Delete} icon={UserIcon} />
    <Resource name="affectations"
      list={AffectationList} create={AffectationCreate}
      edit={AffectationEdit} remove={Delete} icon={DashIcon} />

  </Admin >
);


export default App;
