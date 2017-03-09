import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import ClickBox from './ClickBox';


class App extends Component {

  render() {
    const children = this.props.children
    //console.log("data.length " + data.length);
    return (
      <div className="App">
        <div className="App-header">
          <ClickBox>         
             <Hello who="Fred"/>
          </ClickBox>
          <img src={logo} className="App-logo" alt="logo" />
          {/*<h2>Welcome to React</h2>*/}
          {/*{ [1, 2].map((x) => <Hello key={x} />)}   // shall return on each occurence // key to avoid warning*/}
          {/* return <Hello/> */}
          {/*<Hello />*/}
          <p>
            <Link to="/Home">Homepage | </Link>
            <Link to="/search">Filterpage | </Link>
            <Link to="/hello">HelloPage  </Link>
          </p>
        </div>
        <div className="App_content">
          {children}
        </div>
      </div>
    );
  }
}

export default App;
