import React from 'react';
import Search from './Search';
// import data from '../../data.js';


class SearchPage extends React.Component {
    render() {
        const children = this.props.children;

        return (

            <div className="columns">
                <div className="columns-left">
                    {/*---blabla -- */}
                  <Search/>
                </div>
                <div className="columns-right">
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                    {children}
                </div>
            </div>
        )
    }
};

export default SearchPage;