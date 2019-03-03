import React, {Component} from 'react'
import './InputNickname.css'

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
        <form id="form" className="input-nickname-form" onSubmit={(e) => {
          e.preventDefault();
          this.props.onNickname(this.state.inputValue);
        }}>
          <label className="input-nickname-form__label" htmlFor="message">INPUT YOUR NICKNAME: </label>
          <input className="input-nickname-form__input" onChange={this.valueChangeHandler.bind(this)} type="text" id="input" required autoFocus
                 autoComplete="off" pattern="[A-z]{3,}" required/>
        </form>
    )
  }
}

export default Form;