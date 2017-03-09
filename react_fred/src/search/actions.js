export const SEARCH = '@search/SEARCH';  // convention redux pour le debug
export const SEARCH_START = '@search/SEARCH_START';  // convention redux pour le debug
export const SEARCH_SUCCESS = '@search/SEARCH_SUCCESS';  // convention redux pour le debug
export const SEARCH_ERROR = '@search/SEARCH_ERROR';  // convention redux pour le debug

export const FETCH_PROJET = '@search/FETCH_PROJET';  // convention redux pour le debug
export const FETCH_PROJET_SUCCESS = '@search/FETCH_PROJET_SUCCESS';  // convention redux pour le debug
export const FETCH_PROJET_ERROR = '@search/FETCH_PROJET_SUCCESS';  // convention redux pour le debug

export const CLEAR_SEARCH = '@search/CLEAR_SEARCH';  // convention redux pour le debug


export const searchApi = (value) => ({
    type: 'api',
    types: [SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR],
//    promise: (apiClient) => apiClient(`/?s=${value}`)
    promise: (apiClient) => apiClient(`/projets`)   // URL
})


export const search = (value) =>
    (dispatch) => {
        dispatch({
            type: SEARCH,
            payload: value
        });
        dispatch(searchApi(value));
    }


export const clearSearch = () => ({
    type: CLEAR_SEARCH

})

// export const fetchProjet = (value) => ({
//     type: 'api',
// //     types: [FETCH_PROJET_SUCCESS, FETCH_PROJET_SUCCESS, FETCH_PROJET_ERROR],
// //     promise: (apiClient) => apiClient(`/?i=${value}`)
// })

export const fetchProjet = (value) => ({
    type: 'api',
    types: [FETCH_PROJET_SUCCESS, FETCH_PROJET_SUCCESS, FETCH_PROJET_ERROR],
    promise: (apiClient) => apiClient(`/projets/${value}`)
})