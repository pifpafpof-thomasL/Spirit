import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Notification, AppBar } from 'admin-on-rest/lib/mui';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
// import Dashboard from './Dashboard';


// added by thomas
import PostIcon from 'material-ui/svg-icons/action/book';
import CircularProgress from 'material-ui/CircularProgress';


// in src/MyLayout
const MyMenu = () => (
    <Paper style={{ flex: '0 0 8em', order: -1 }}>
        <List>
            <ListItem containerElement={<Link to={`/timelines`} />} primaryText="Timeline" leftIcon={<PostIcon />} />
            <ListItem containerElement={<Link to={`/projets`} />} primaryText="Projets" leftIcon={<PostIcon />} />
            <ListItem containerElement={<Link to={`/consultants`} />} primaryText="Consutants" leftIcon={<PostIcon />} />
        </List>
    </Paper>
);

const MyLayout = ({ isLoading, children, route, title }) => {
    const Title = <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>{title}</Link>;
    const RightElement = isLoading ? <CircularProgress color="#fff" size={30} thickness={2} style={{ margin: 8 }} /> : <span />;

    return (
        <MuiThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar title={title} iconElementRight={RightElement} isLoading={false} />
                <div className="body" style={{ display: 'flex', flex: '1', backgroundColor: '#edecec' }}>
                    <div style={{ flex: 1 }}>{children}</div>
                    <MyMenu />
                </div>
                <Notification />
            </div>
        </MuiThemeProvider>
    );
};

export default MyLayout;

