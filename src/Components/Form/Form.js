import React, {Component} from 'react'

class Form extends Component {

  state = {
    inputValue: ''
  };

  valueChangeHandler(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  render() {
    return (
        <form id="form" onSubmit={(e) => {
          e.preventDefault();
          this.props.onMessage(this.state.inputValue);
        }}>
          <label htmlFor="message">&gt;</label>
          <input onChange={this.valueChangeHandler.bind(this)} type="text" id="input" required autoFocus
                 autoComplete="off"/>
        </form>
    )
  }
}

export default Form;