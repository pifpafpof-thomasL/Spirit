//import React from 'react';
import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Notification, AppBar, Sidebar } from 'admin-on-rest/lib/mui';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
// import Dashboard from './Dashboard';


// added by thomas
import PostIcon from 'material-ui/svg-icons/action/book';
import CircularProgress from 'material-ui/CircularProgress';

// added by thomas for more mayout customizing
import { connect } from 'react-redux';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import {  Sidebar } from 'admin-on-rest/lib/mui';
import { setSidebarVisibility as setSidebarVisibilityAction } from 'admin-on-rest';


// in src/MyLayout
const MyMenu = () => (
    <Paper style={{ flex: '0 0 8em', order: -1 }}>
        <List>
            <ListItem containerElement={<Link to={`/timelines`} />} primaryText="Timeline" leftIcon={<PostIcon />} />
            <ListItem containerElement={<Link to={`/projets`} />} primaryText="Projets" leftIcon={<PostIcon />} />
            <ListItem containerElement={<Link to={`/consultants`}  />} primaryText="Consultants" leftIcon={<PostIcon />} />
        </List>
    </Paper>
);

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    },
};

const MyLayout = ({ isLoading, children, route, title }) => {
   // const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{title}</Link>;
    const RightElement = isLoading ? <CircularProgress color="#fff" size={30} thickness={2} style={{ margin: 8 }} /> : <span />;

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={title} isLoading={false} iconElementRight={RightElement} />
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    {/*<div style={{ flex: 1 }}>{children}</div>*/}
                    <div style={styles.content}>{children}</div>
                    
                    <MyMenu />
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

export default MyLayout;
/*



//injectTapEventPlugin();

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    },
};

class MyLayout extends Component {
    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    render() {
        const { children, isLoading, menu, title } = this.props;
        return (
            <MuiThemeProvider>
                <div style={styles.main}>
                    {/*<AppBar title={title} />*/
                /*}
                    <AppBar title={title} />
                    <div className="body" style={styles.body}>
                        <div style={styles.content}>
                            {children}
                        </div>
                        <Sidebar>
                        {/*<Sidebar theme={theme}>*/
                    /*}
                            {menu}
                        </Sidebar>
                    </div>
                    <Notification />
                    {isLoading && <CircularProgress
                        color="#fff"
                        size={30}                          
                        thickness={2}
                        style={styles.loader}
                    />}
                    {/*size={width === 1 ? 20 : 30}*/
                /*}
                </div>
            </MuiThemeProvider>
        );
    }
}

MyLayout.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node,
    menu: PropTypes.element,
    setSidebarVisibility: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

export default connect(mapStateToProps, {
    setSidebarVisibility: setSidebarVisibilityAction,
})(MyLayout);

*/


