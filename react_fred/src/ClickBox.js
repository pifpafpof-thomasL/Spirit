import React from 'react';
import { connect } from 'react-redux';


class ClickBox extends React.Component {
    state = {
        display: false
    }
    //display = false;

    //pleaseDisplay () {  // !! 'this' will be null, need to use ES6
    pleaseDisplay = () => {
        // this.display =  !this.display // setState triggers the render()
        this.setState({ display: !this.state.display })  // setState triggers the render()
    }

    componentWillMount = () => {
        console.log('ClickBox::before render')
    }

    componentDidMount = () => {
        console.log('after render in the browser')
    }

    render() {

        //const children = this.props.children;
        const children = this.props.query;
        const display = this.state.display;

        console.log('ClickBox::rendering..' + display )

        //const display = this.display;
        return <div>
            <p>
                <button onClick={this.pleaseDisplay}> See search query </button>
                {display ? " " + children : null}
            </p>
        </div>
    }
}

// export default ClickBox;


export default connect(state => ({
    query: state.search.query // place where to store and to listen
}))(ClickBox);