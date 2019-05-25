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
  };

  componentDidMount() {
    this.newMessageSound = new Audio(newMessageSound);

    this.socket = io('http://localhost:3001');

    this.socket.on('connect', () => this.setState({ status: 'CONNECTED' }));

    this.socket.on('disconnect', () => this.setState({
      status: 'DISCONNECTED',
      users: [],
      messages: [],
      nickname: '',
      connections: 0,
    }));

    this.socket.on('connectionsUpdate', (data) => {
      this.newMessageSound.play();

      this.setState({
        connections: data.connections,
        users: data.users,
      });
    });

    this.socket.on('chat', (msg) => {
      this.newMessageSound.play();
      const { messages } = this.state;

      messages.push(msg);

      this.setState({
        messages,
      });
    });
  }

  handleMessage = (message) => {
    const { nickname } = this.state;
    this.socket.emit('chat', { text: message, nickname });
  };

  handleNickname = (nickname) => {
    this.setState({ nickname });
    this.socket.emit('connectionsUpdate', nickname);
  };

  render() {
    const { status } = this.state;
    const { nickname } = this.state;
    const { messages } = this.state;
    const { connections } = this.state;
    const { users } = this.state;

    if (status === 'CONNECTED' && nickname) {
      return (
        <div className="App">
          <Header status={status} />
          <main className="main">
            <div className="messages-block">
              <Messages messages={messages} />
              <MessagesForm onMessage={this.handleMessage} />
            </div>
            <Connections connections={connections} users={users} />
          </main>
        </div>
      );
    }
    if (status === 'CONNECTED') {
      return (
        <div className="App">
          <Header status={status} />
          <InputNickname onNickname={this.handleNickname} />
        </div>
      );
    }
    return (
      <div className="App">
        <Header status={status} />
      </div>
    );
  }
}

export default App;
