import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route } from 'react-router-dom';
import Lobby from './lobby';
import ChatRoom from './chatRoom';

const App = () => (
    <div className='container'>
        <h1 className='center-align'>Fire Chatty Chat</h1>
        <Route exact path='/' component={Lobby}/>
        {/* :roomId means the string will be changed for every unique room*/}
        <Route path='/room/:roomId/log/:logId' component={ChatRoom}/>
    </div>
);

export default App;