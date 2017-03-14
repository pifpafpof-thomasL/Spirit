import React from 'react';

import Timeline from 'react-visjs-timeline'

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
            <div className="timeLine-page">
                <h2>____  timeLine page !!! yaya !!! _____</h2>
                <Timeline options={options} />

            </div>
        )
    }
};

export default TimeLinePage;