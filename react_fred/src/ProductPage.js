import React from 'react';
// import data from './data.js';
import { fetchProjet } from './search/actions';
import { connect } from 'react-redux';


class ProductPage extends React.Component {

    // on first click (first "render"?) on hyperlink result (left column)
    componentDidMount = () => {
        this.fetchProduct(this.props.params.id)
    }

    componentDidUpdate = () => {
        //this.fetchUpdate()
    }

    // called when new props are given to this page
    componentWillReceiveProps = (nextProps) => {
        // if old !== new film id
        if (this.props.params.id !== nextProps.params.id) {
            this.fetchProduct(nextProps.params.id)
        }
    }

    fetchProduct = (id) => {
        const { dispatch } = this.props;
        dispatch(fetchProjet(id))  // value sent to redux store
    }

    render() {
        const { projet } = this.props;

        console.log(this.props);
        console.log('projet', projet);
        //const {found, product :{ name, shortDescription} } = this.state;
        return <div className="product-page">
            {
                projet ?
                    <div>
                        <h2>{projet.id}</h2>
                        <h2>{projet.Nom}</h2>
                        <h2>{projet.DateDebut}</h2>
                        <h2>{projet.DateFin}</h2>
{/*//{"id":3,"Nom":"pull","DateDebut":"2016-02-12T00:00:00.000Z","DateFin":"2017-03-03T00:00:00.000Z"*/}

                        {/*<img className="image" src={projet.Poster} height="200" width="200" 
                             alt="Projet Poster"/>*/}
                        {/*//<p>{shortDescription}</p>*/}
                    </div>
                :
                    <div>
                        loading ...
                    </div>
            }
        </div>
    }

};

export default connect(state => ({
    projet: state.search.projet // subscribe to projet updates
}))(ProductPage);