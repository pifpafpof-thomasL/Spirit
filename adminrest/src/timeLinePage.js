import React from 'react';

import Timeline from 'react-visjs-timeline'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import logo from './logo.svg';

// http://visjs.org/docs/timeline/#Configuration_Options
const options = {
  width: '80%',
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

class TimeLinePage extends React.Component {
    render() {
        return (
    <Card style={{ margin: '1em' }}>
        <CardHeader title="Welcome to the project timeline">
            <img src={logo} className="App-logo" alt="logo" /> 
        </CardHeader>
        <CardText>Lorem ipsum sic dolor amet...</CardText>
        <Timeline options={options} />

    </Card>

            /*<div className="timeLine-page">
                <h2>____  timeLine page !!! yaya !!! _____</h2>
                <Timeline options={options} />

            </div>*/
        )
    }
};

export default TimeLinePage;