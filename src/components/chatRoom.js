import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomData, getChatLog, sendNewMessage } from "../actions";
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import RaisedButton from 'material-ui/RaisedButton';

class ChatRoom extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: ''
        }
    }

    componentDidMount(){
        const { roomId, logId } = this.props.match.params;

        this.props.getRoomData(roomId, logId);

        db.ref(`/chat-logs/${logId}`).on('value', snapshot => {
            console.log('Chat log snnapshot', snapshot.val());
            this.props.getChatLog(snapshot.val());
        })
    }

    componentWillUnmount(){
        db.ref(`/chat-logs/${this.props.match.params.logId}`).off();
    }

    sendMessage(event){
        console.log('sending message');
        event.preventDefault();

        this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message);

        this.setState({
            message: ''
        })
    }

    render(){
        // .match comes from react router dom. info about the route
        console.log('chataaaaaa', this.props);
        const { name } = this.props.roomInfo;
        const { chatLog } = this.props;

        //reverse will map it from last index first
        const msgs = Object.keys(chatLog).reverse().map((key) => {
            return <li style={{color: 'black'}} key={key} className='collection-item'>{chatLog[key]}</li>
        });

        return (
            <div>
                <Link to='/'>Return to Lobby</Link>
                <h3>{name ? name : 'Loading...'}</h3>

                <form>
                    <label>Enter msg:</label>
                    <input type='text' value={this.state.message} onChange={event => this.setState({message: event.target.value})}/>
                    <RaisedButton label="Send" onClick={this.sendMessage.bind(this)} />
                </form>
                <ul className='collection'>
                    {msgs}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        roomInfo: state.chat.currentRoom,
        chatLog: state.chat.chatLog
    }
}

export default connect(mapStateToProps, { getRoomData, getChatLog, sendNewMessage })(ChatRoom);