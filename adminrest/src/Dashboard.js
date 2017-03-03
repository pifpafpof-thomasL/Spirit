// in src/Dashboard.js
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import logo from './logo.svg';

export default () => (
    <Card style={{ margin: '2em' }}>
        <CardHeader title="Welcome to the administration">
            <img src={logo} className="App-logo" alt="logo" />  {/* not seen!? */}
        </CardHeader>
        <CardText>Lorem ipsum sic dolor amet...</CardText>
    </Card>
);