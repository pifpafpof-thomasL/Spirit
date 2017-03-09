// in src/App.js
import React, { PropTypes } from 'react';
import { render } from 'react-dom';

// redux, react-router, and saga form the 'kernel' on which admin-on-rest runs
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import withProps from 'recompose/withProps';

// for admin-on-rest icons
import PostIcon from 'material-ui/svg-icons/action/book';
import UserIcon from 'material-ui/svg-icons/social/group';


// prebuilt admin-on-rest features
import { adminReducer, localeReducer, 
    crudSaga, CrudRoute, TranslationProvider, simpleRestClient } from 'admin-on-rest';

// your app components
import Dashboard from './Dashboard';
// import { PostList, PostCreate, PostEdit, PostShow } from './Post';
// import { CommentList, CommentEdit, CommentCreate } from './Comment';
// import { UserList, UserEdit, UserCreate } from './User';
import { ProjetList } from './projets';
import { ConsultantList, ConsultantEdit } from './consultants';
import { Delete, Layout } from 'admin-on-rest/lib/mui';
// your app labels
//import messages from './i18n';

// create a Redux app
const reducer = combineReducers({
    admin: adminReducer([{ name: 'projets' }, { name: 'consultants' }]),
    locale: localeReducer(),
    form: formReducer,
    routing: routerReducer,
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, undefined, compose(
    applyMiddleware(routerMiddleware(hashHistory), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
const restClient = simpleRestClient('http://localhost:4000');
sagaMiddleware.run(crudSaga(restClient));

// the resources array is used for the menu
const resources = [
    { name: 'projets', list: ProjetList },
    { name: 'consultants', list: ConsultantList },
];

const LayoutWithTitle = withProps({ title: 'My Admin' })(Layout);

// initialize the router
const history = syncHistoryWithStore(hashHistory, store);


// bootstrap redux and the routes
const App = () => (
    <Provider store={store}>
      <TranslationProvider messages={ {} }>
            <Router history={history}>
                <Route path="/" component={LayoutWithTitle} resources={resources}>
                    <IndexRoute component={Dashboard} />
                    {/*<CrudRoute path="posts" list={PostList} create={PostCreate} edit={PostEdit} show={PostShow} remove={Delete} />*/}
                    {/*<CrudRoute path="comments" list={CommentList} create={CommentCreate} edit={CommentEdit} remove={Delete} />*/}
                    {/*<CrudRoute path="users" list={UserList} create={UserCreate} edit={UserEdit} remove={Delete} />*/}
                    {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} />*/}
                    <CrudRoute path="projets" list={ProjetList} icon={PostIcon} />
                    <CrudRoute path="consultants" list={ConsultantList} edit={ConsultantEdit} remove={Delete} icon={UserIcon} />
                </Route>
            </Router>
        </TranslationProvider>
    </Provider>
);

export default App;
