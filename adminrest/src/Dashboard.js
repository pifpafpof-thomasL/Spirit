// in src/Dashboard.js
import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import logo from './logo.svg';
import Timeline from 'react-visjs-timeline'


// http://visjs.org/docs/timeline/#Configuration_Options
const options = {
    width: '100%',
    height: '60px',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 10000,
    type: 'background',
    format: {
        minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
        }
    }
}

// jsx

export default () => (
    <Card style={{ margin: '1em' }}>
        <CardHeader title="Welcome to the project dashboard">
        <img src={logo} className="App-logo" alt="logo" />  {/* not seen!? */}
        </CardHeader>
        <CardText>Lorem ipsum sic dolor amet...</CardText>
        <Timeline options={options} />

    </Card>
);