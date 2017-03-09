import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import loggerMiddleware from './search/middlewares/logger'
import HelloPage from './HelloPage'
import IndexPage from './IndexPage'
import ProductPage from './ProductPage'
import SearchPage from './search/components/SearchPage'

// reducer
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//import thunk from 'redux-thunk' // replace by redux-saga
import createSagaMiddleware from 'redux-saga'

import searchReducer from './search/reducer'
import apiMiddleware from './search/middlewares/api';
import { composeWithDevTools } from 'redux-devtools-extension';

//admin-on-rest
import { //adminReducer, localeReducer, 
  crudSaga, 
  //CrudRoute, TranslationProvider, 
  simpleRestClient } from 'admin-on-rest';


const reducers = combineReducers({
  search: searchReducer
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware, loggerMiddleware, apiMiddleware)
  ));

const restClient = simpleRestClient('http://localhost:4000');

sagaMiddleware.run(crudSaga(restClient));

// end of reducer

import './index.css'

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="hello" component={HelloPage} />
        <Route path="home" component={IndexPage} />
        <Route path="search" component={SearchPage}>
          <Route path=":id" component={ProductPage} />
        </Route>
        {/*<IndexRoute component={IndexPage} /> */}
         {/* default page */}
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  routes,
  document.getElementById('root')
);
