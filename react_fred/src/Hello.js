import React from 'react';
import { connect } from 'react-redux';

class Hello extends React.Component {
    render() {
        const who = this.props.query
        // equivaut à   
        // const who = this.props.who
        return <h1>Hello {who}</h1>  // ici { who } via JSX
    }
}

export default connect(state => ({
    query: state.query
})
)(Hello); // ES6 syntax
// vaut 
//module.exports = Hello;