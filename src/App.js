import React, { Component } from 'react';
import io from 'socket.io-client';

import Messages from './Components/MessagesList';
import InputNickname from './Components/NicknameForm';
import MessagesForm from './Components/MessagesForm';
import Connections from './Components/ActiveConnections';
import Header from './Components/Header';

import newMessageSound from './sounds/new-message.mp3';
import './App.css';

class App extends Component {

    state = {
        status: 'DISCONNECTED',
        users: [],
        messages: [],
        nickname: '',
        connections: 0,
        isTyping: false
    };

    componentDidMount() {
        this.newMessageSound = new Audio(newMessageSound);

        this.socket = io('http://localhost:3001');

        this.socket.on('connect', () => this.setState({status: 'CONNECTED'}));

        this.socket.on('disconnect', () => this.setState({
            status: 'DISCONNECTED',
            users: [],
            messages: [],
            nickname: '',
            connections: 0
        }));

        this.socket.on('connectionsUpdate', data => {
                this.newMessageSound.play();

                this.setState({
                    connections: data.connections,
                    users: data.users
                });
            }
        );

        this.socket.on('chat', msg => {
            this.newMessageSound.play();
            const messages = this.state.messages;

            messages.push(msg);

            this.setState({
                messages,
            })
        });
    }

    handleMessage = message => {
        this.socket.emit('chat', {text: message, nickname: this.state.nickname});
    };

    handleNickname = nickname => {
        this.setState({nickname});
        this.socket.emit('connectionsUpdate', nickname);
    };

    render() {
        if(this.state.status === 'CONNECTED' && this.state.nickname) {
            return (
                <div className="App">
                    <Header status={this.state.status} />
                    <main className="main">
                        <div className="messages-block">
                            <Messages messages={this.state.messages} />
                            <MessagesForm onMessage={this.handleMessage} />
                        </div>
                        <Connections connections={this.state.connections} users={this.state.users} />
                    </main>
                </div>
            );
        } else if(this.state.status === 'CONNECTED') {
            return (
                <div className="App">
                    <Header status={this.state.status} />
                    <InputNickname onNickname={this.handleNickname} />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Header status={this.state.status} />
                </div>
            )
        }

    }
}


export default App;
