import React from 'react';
import { Route } from 'react-router';
// import Foo from './Foo';
import TimeLinePage from './timeLinePage';


export default () => (
    <Route>
        <Route path="/timelines" component={TimeLinePage}/>
    </Route>
);