import React from 'react';
import '../assets/css/app.css';
import 'materialize-css/dist/css/materialize.min.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route } from 'react-router-dom';
import Lobby from './lobby';
import ChatRoom from './chatRoom';

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className='container'>
            <h1 className='center-align'>Fire Chatty Chat</h1>
            <Route exact path='/' component={Lobby}/>
            {/* :roomId means the string will be changed for every unique room*/}
            <Route path='/room/:roomId/log/:logId' component={ChatRoom}/>
        </div>
    </MuiThemeProvider>
);

export default App;