import React from 'react';

import VisTimeline from 'react-visjs-timeline'
//import moment from 'moment'

import { Card, CardHeader, CardText } from 'material-ui/Card';
import logo from './logo.svg';

import { connect } from 'react-redux';


import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';

// http://visjs.org/docs/timeline/#Configuration_Options


function rangeChangedHandler(props) {
    // handle range change
    alert("rangeChanged done!")
}

function clickHandler(props) {
    // handle click event
    //
    //alert("Click in progress!") // to many click!
}
////////////////////////////////////////

// jsx

class TimeLinePage extends React.Component {

    // A constructor, to make sure variable used in this class are only local
    constructor(props) {
        super(props);  // to be able to call "this"" later
        const options = {
            width: '100%',
            height: '500px',
            showCurrentTime: true,
            clickToUse: true,  // does not work under react
            editable: true, /* this option means you can add or remove items by clicking on the timeline */
            // but does not allow resize of the end/start date
            zoomMin: 1000 * 60 * 60 * 24, // last digit is min zoom level in hours
            type: 'range', // box, range, background
        };

    }


    // first time the component is mount
    componentWillMount = () => {
        const { dispatch, restClient } = this.props;
        //apiClient(`/projets`)        
        //restClient(GET_LIST, "projets") // does not work restClient is undefined

        //to be written in custom timeLineActions .js
        // will load projets in redux store
        dispatch({

            type: 'CRUD_GET_LIST',
            payload: {
                pagination: {
                    page: 1,
                    perPage: 10
                },
                sort: {
                    field: 'id',
                    order: 'DESC'
                },
                filter: {}
            },
            meta: {
                resource: 'projets',
                fetch: 'GET_LIST',
                cancelPrevious: true
            }
        })
}



render() {
    const { projets } = this.props; // comes from redux
    let vgroups = []; // vis group to display items
    let vitems = []; // vis items to idsplay within groups

    Object.keys(projets.data).map((item, index) => {
        vgroups.push({
            id: index, // + 1, // group id
            content: projets.data[item].Nom,
        })

        vitems.push({
            start: projets.data[item].DateDebut,
            end: projets.data[item].DateFin,
            content: projets.data[item].Nom,  // same as group name for a better display
            id: index + 2, // +2 in case a test item on index 1 is setup
            group: index, // + 1,
            //editable: true, // item can then can be removed or drag&drop from a group to another
        })
    })

    return (
        <Card style={{ margin: '1em' }}>
            <CardHeader title="VisTimeline">
                <img src={logo} className="App-logo" alt="logo" />
                <VisTimeline groups={vgroups}
                    items={vitems} options={this.options}
                    rangeChangedHandler={rangeChangedHandler}
                    clickHandler={clickHandler}
                />
            </CardHeader>
            <CardText>.. please reload Projets..</CardText>

        </Card >
    )
}
};


export default connect(
    state => ({
        projets: state.admin.projets
    }))(TimeLinePage);