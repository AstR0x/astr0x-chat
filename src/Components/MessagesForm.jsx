import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessagesForm extends Component {
  state = {
    inputValue: '',
  };

  handleChangeValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { onMessage } = this.props;
    const { inputValue } = this.state;
    onMessage(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form className="messages-form" onSubmit={this.handleSubmit}>
        <label className="messages-form__label" htmlFor="message-input">&gt;</label>
        <input
          id="message-input"
          className="messages-form__input"
          type="text"
          required
          autoFocus
          value={inputValue}
          autoComplete="off"
          maxLength="100"
          onChange={this.handleChangeValue}
        />
      </form>
    );
  }
}

MessagesForm.propTypes = {
  onMessage: PropTypes.func.isRequired,
};

export default MessagesForm;
