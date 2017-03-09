const api = store => next => action => {
    if (action.type !== 'api') return next(action);
    //console.info(action.type, action);
    //next(action)
    const dispatch = store.dispatch;
    const types = action.types;
    const [START, SUCCESS, ERROR] = types;
    const promise = action.promise;

    dispatch({
        type: START
    })

    const doFetch = (url) => {
        const baseurl = 'http://localhost:4000'
//        const baseurl = 'http://www.omdbapi.com'
        return fetch(baseurl + url, {
            method: 'GET',
        })
    }

    promise(doFetch)
        .then(result => {
            console.log(result)
            if (result.ok) {
                result.json().then(data => {
                    if (data.Error) {
                        dispatch({
                            type: ERROR,
                            payload: data  //data.Search
                        })
                    } else {
                        dispatch({
                            type: SUCCESS,
                            payload: data  //data.Search
                        })
                    }

                })
            }
            else {
                dispatch({
                    type: ERROR,
                    payload: result
                })
            }
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: error
            })
        })
}

export default api;