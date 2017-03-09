import React from 'react';
import { Link } from 'react-router';


class Search extends React.Component {
    // state = {
    //     searchValue: '',
    //     results: []
    // }

    onSearch = (e) => {
        // dispatch(search)

        // const val = e.target.value;
        // const data = this.props.data;
        // let filteredResults = [];
        // if (val !== '') {
        //     const regexp = new RegExp(val, "i");
        //     filteredResults = data.filter ( (product) => {
        //         const match = product.name.match(regexp)
        //         return match === null ? false : true;
        //     })
        }

        this.setState({
            searchValue: val,
            results: val === ''? [] : filteredResults
        })
        console.log("searching..." + val)
    }



    render() {
        // const { value, results } = this.state; //.searchValue;
        const { query, results } = this.props; // comes from redux
        const res = results.slice(0,10);
        return (
            <div className="search-page">
                <h2>Search</h2>
                <p><input type="text" value={value} onChange={this.onSearch} /></p>
                <p>{results.length}</p>
                <ul>
                    {/*{results.map((product)=> <li>{product.name}</li>)}  // ok ! but generates a 'key' warning*/}
                    {/*{res.map((product)=> <li key={product.slug}>{product.name}</li>)}  // ok! */}
                    {res.map((product) => (
                        <li key={product.slug}>
                            <Link to={`/search/${product.slug}`} > {product.name} </Link>)
                        </li>)
                    )}
                </ul>
            </div>
        )
    }
};

export default Search;