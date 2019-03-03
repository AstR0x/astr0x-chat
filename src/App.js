import React, {Component} from 'react';
import Messages from './Components/Messages/Messages';
import InputNickname from './Components/InputNickname/InputNickname';
import Form from './Components/Form/Form';
import Connections from './Components/Connections/Connections';
import io from 'socket.io-client';
import sound from './sounds/sound.mp3';
import './App.css';

class App extends Component {

  state = {
    status: 'DISCONNECTED',
    users: [],
    nickname: '',
    messages: [],
    connections: 0,
  };

  componentDidMount() {
    this.sound = new Audio(sound);

    this.socket = io('http://37.230.115.224:3000');

    this.socket.on('connect', () => this.setState({status: 'CONNECTED'}));

    this.socket.on('disconnect', () => this.setState({status: 'DISCONNECTED'}));

    this.socket.on('connectionsUpdate', connections => {
          console.log(connections);
          this.setState({
            connections: connections.amount,
            users: connections.users
          });
        }
    );

    this.socket.on('chat', msg => {
      this.sound.play();
      const messages = this.state.messages.concat();

      messages.push(msg);

      this.setState({
        messages,
      })
    });
  }

  messageHandler = (message) => {
    this.socket.emit('chat', message);
    document.getElementById('input').value = '';
  };

  nicknameHandler = (nickname) => {
    this.setState({nickname});
    this.socket.emit('connectionsUpdate', nickname);
  };

  render() {
    return (
        <div className="App">
          <header>
            <h1>AstroChat</h1>
            <span id="status">{this.state.status}</span>
          </header>
          {!this.state.nickname ?
              <InputNickname onNickname={this.nicknameHandler}/> :
              <main className="main">
                <div className="messages-block">
                  <Messages messages={this.state.messages}/>
                  <Form onMessage={this.messageHandler}/>
                </div>
                <Connections connections={this.state.connections} users={this.state.users}/>
              </main>
          }
        </div>
    );
  }
}

export default App;
