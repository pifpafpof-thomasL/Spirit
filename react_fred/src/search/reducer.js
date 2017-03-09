import {
    SEARCH,
    SEARCH_START,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    FETCH_PROJET,
    FETCH_PROJET_ERROR,
    FETCH_PROJET_SUCCESS,
    CLEAR_SEARCH
} from './actions';

const initialState = {
    query: '',
    results: [],
    searching: false,
    error: null,
    projet: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                query: action.payload
            }
        case SEARCH_START:
            return {
                ...state,
                searching: true
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                results: action.payload, // all JSON objects  //.Search,   //like return by JSON server
                error: null
            }
        case SEARCH_ERROR:
            return {
                ...state,
                searching: false,
                results: [],  //payload
                error: action.payload,
                projet: null
            }
        case FETCH_PROJET:
            return {
                ...state,
                projet: action.payload
            }
        case FETCH_PROJET_SUCCESS:
            return {
                ...state,
                projet: action.payload,
                error: null
            }
        case FETCH_PROJET_ERROR: // TODO
            return {
                ...state,
                projet: "todo",
                error: "todo"
            }
        case CLEAR_SEARCH:
            return {
                ...initialState
            }
        default:
            return state; // middleware always return at least an unchanged state
    }
}

export default reducer;