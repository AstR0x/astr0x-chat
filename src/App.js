import React, { Component } from 'react';
import Messages from './Components/Messages/Messages';
import Form from './Components/Form/Form';
import './App.css';

class App extends Component {

  state = {
    status: 'DISCONNECTED',
    messages: [],
  };

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001');

    this.ws.onopen = () => this.setState({ status: 'CONNECTED' });

    this.ws.onclose = () => this.setState( {status: 'DISCONNECTED' });

    this.ws.onmessage = msg => {
      const messages = this.state.messages.concat();
      messages.push(msg.data);

      this.setState({
        messages
      })
    };
  }

  messageHandler = (message) => {
    this.ws.send(message);
    document.getElementById('input').value = '';
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>AstroChat</h1>
          <span id="status">{this.state.status}</span>
        </header>
        <main>
          <Messages messages={this.state.messages}/>
          <Form onMessage={this.messageHandler}/>
        </main>
      </div>
    );
  }
}

export default App;
