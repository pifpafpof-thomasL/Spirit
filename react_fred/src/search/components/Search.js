import React from 'react';
import { Link } from 'react-router';

//redux
import { connect } from 'react-redux';
import { search, clearSearch } from '../actions';

class Search extends React.Component {

    componentDidMount = () => {
        this.focusSearch();
    }


    // this component is destroyed
    componentWillUnmount = () => {
        // dispatch(search)
        // console.log("searching..." + val)
        const { dispatch } = this.props;
        dispatch(clearSearch());  // value sent to redux store
    }

    onSearch = (e) => {
        // dispatch(search)
        // console.log("searching..." + val)
        const { dispatch } = this.props;
        let value = e.target.value
        if (value) {
            dispatch(search(value));  // value sent to redux store
            //dispatch(searchApi(value));  // done inside search()
        } else {
            dispatch(clearSearch())
        }
    }

    focusSearch = () => {
        // forcer focus sur le search
        this.searchInput.focus()
    }

    render() {
        // const { value, results } = this.state; //.searchValue;
        const { query, results, error } = this.props; // comes from redux
        //const res = results.slice(0, 10);  // coupe les résultats
        const res = results;
        return (
            <div className="search-page">
                <h2>Filter</h2>
                <p><input type="text" value={query} onChange={this.onSearch} 
                        ref={ (ref) => this.searchInput = ref } /></p>
                {error && <div style={{ color: 'red' }}>{error.Error}</div>}
                <p>{results.length !== 0 && results.length}</p>
                <ul>
                    {/*{results.map((product)=> <li>{product.name}</li>)}  // ok ! but generates a 'key' warning*/}
                    {/*{res.map((product)=> <li key={product.slug}>{product.name}</li>)}  // ok! */}
                    {res.map((projet) => (
                        <li key={projet.id}>
                            <Link to={`/search/${projet.id}`} > {projet.Nom} </Link>)
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
};

export default connect(
    state => ({
        query: state.search.query,
        results: state.search.results,
        error: state.search.error
    }))(Search);