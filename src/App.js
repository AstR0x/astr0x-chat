import React, {Component} from 'react';
import Messages from './Components/Messages/Messages';
import Form from './Components/Form/Form';
import Connections from './Components/Connections/Connections'
import './App.css';

class App extends Component {

  state = {
    status: 'DISCONNECTED',
    messages: [],
    connections: 0,
  };

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3000');

    this.ws.onopen = () => this.setState({status: 'CONNECTED'});

    this.ws.onclose = () => this.setState({status: 'DISCONNECTED'});

    this.ws.onmessage = msg => {
      const messages = this.state.messages.concat();
      const newMessage = JSON.parse(msg.data);
      const connections = newMessage.connections;

      messages.push(newMessage);

      this.setState({
        messages,
        connections,
      })
    };
  }

  messageHandler = (message) => {
    this.ws.send(message);
    document.getElementById('input').value = '';
  };

  render() {
    console.log(this.state.connections);
    return (
        <div className="App">
          <header>
            <h1>AstroChat</h1>
            <span id="status">{this.state.status}</span>
          </header>
          <main className="main">
            <div className="messages-block">
              <Messages messages={this.state.messages}/>
              <Form onMessage={this.messageHandler}/>
            </div>
            <Connections connections={this.state.connections}/>
          </main>
        </div>
    );
  }
}

export default App;
