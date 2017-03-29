import React from 'react';

import Timeline from 'react-calendar-timeline'
// We tried http://visjs.org/docs/timeline
// but it is not well integrated with react, so we gave up using this lib

import moment from 'moment'

import { Card, CardHeader, CardText } from 'material-ui/Card';
import logo from './logo.svg';

import { connect } from 'react-redux';

import { editProjet, loadProjets, updateDateProjet } from './timeLinePageActions';



////////////////////////////////////////
class TimeLinePage extends React.Component {


    // A constructor, to make sure variable used in this class are only local
    constructor(props) {
        super(props);  // to be able to call "this"" later

    }

    // this component is destroyed
    // componentWillUnmount = () => {
    //     this.tgroups = []; // timeline group to display items
    //     this.titems = []; // timeline items to idsplay within groups
    // }

    // first time the component is mounted
    componentWillMount = () => {
        const { dispatch  } = this.props;

        // will load projets in redux store (by sending a request to the server)
        // so timeline get a none empty projets
        dispatch(loadProjets())

    }


    onItemClick = (itemId, e) => {
        // handle click event
        //        alert("Click ! :-)") 
        const { projets, dispatch  } = this.props;

        // a click will edit the project
        dispatch(editProjet(itemId))
    }

    onItemResize = (item, time, edge) => {
        // For example: 
        // itemId = 4, time = 1302737400000, edge = "right"
        const { projets, dispatch  } = this.props;

        let newDate = moment(time).toISOString()

        // alert("Resize ! " + newDate + " ** on item ** " + itemId) 

        // request to the server to update the date
        dispatch(updateDateProjet(item, newDate, edge, projets))
        // dispatch({
        //     type: 'CRUD_UPDATE',
        //     payload: {
        //         id: item, //'9',
        //         data: {  // body envoyé au serveur pour traitement
        //             id: item, //9,
        //             Nom: projets.data[item].Nom, // pas de chgt mais necessaire pour retour serveur
        //             DateDebut: edge === "left" ? newDate : projets.data[item].DateDebut,
        //             DateFin: edge === "right" ? newDate : projets.data[item].DateFin,
        //             IdentifiantMinos: projets.data[item].IdentifiantMinos,
        //             IdentifiantHermes: projets.data[item].IdentifiantMinos,
        //             Adm: projets.data[item].Adm,
        //             id_Client: projets.data[item].id_Client,
        //         },
        //         basePath: '/timelines'  //affiche timelines à la fin du traitement
        //     },
        //     meta: {
        //         resource: 'projets',
        //         fetch: 'UPDATE',
        //         cancelPrevious: false
        //     }
        // })
    }


    render() {
        const { projets } = this.props; // comes from redux

        this.tgroups = []; // timeline group to display items
        this.titems = []; // timeline items to idsplay within groups

        let tdefaultTimeStart = moment().add(-1, 'month');
        let tdefaultTimeEnd = moment().add(1, 'month');

        if (Object.keys(projets.data).length === 0) {
            return (  // let's avoid to load timeline that is empty, because zoom will be wrong
                < Card style={{ margin: '1em' }}>
                    <CardText>..loading projet..</CardText >
                </Card >
            )
        }

        Object.keys(projets.data).map((item, index) => {
            this.tgroups.push({
                id: index + 1, // group id
                title: projets.data[item].Nom,
            })

            let tstart_time = moment(projets.data[item].DateDebut)//.valueOf()
            let tend_time = moment(projets.data[item].DateFin) //.valueOf()
            this.titems.push({
                start_time: tstart_time, //.valueOf(),
                end_time: tend_time,
                title: projets.data[item].Nom,  // same as group name for a better display
                id: projets.data[item].id, //index + 1, // +2 in case a test item on index 1 is setup
                group: index + 1,
                canMove: false,
//                canMove: tstart_time > new Date().getTime(), // possible only if project range after today
                canResize: 'both' // always possible 
                //canResize: tend_time > new Date().getTime(),  // possible only if project end of date after today
            })

            // to set the display zoom
            if (tstart_time < tdefaultTimeStart) {
                tdefaultTimeStart = tstart_time
            }
            if (tend_time > tdefaultTimeEnd) {
                tdefaultTimeEnd = tend_time
            }

        })

        return (
            <Card style={{ margin: '1em' }}>
                <CardHeader title="React Timeline">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Timeline
                        groups={this.tgroups}
                        items={this.titems}
                        defaultTimeStart={tdefaultTimeStart.add(-30, 'day')}
                        defaultTimeEnd={tdefaultTimeEnd.add(30, 'day')}
                        minZoom={1000 * 60 * 60 * 24} // last digit is min zoom level in hours
                        onItemClick={this.onItemClick}
                        onItemResize={this.onItemResize}
                    />
                    <CardText></CardText>
                    <CardText>Click on a project to Edit. You can also directly modify a date
                    by draging the right or left edge of the project 'box'.
                    </CardText>                  
                    <CardText>Ctrl+wheel to zoom
                    </CardText>
                </CardHeader >
            </Card >
        )
    }
};


export default connect(
    state => ({
        projets: state.admin.projets
    }))(TimeLinePage);