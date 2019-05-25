/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    inputValue: '',
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onNickname } = this.props;
    const { inputValue } = this.state;
    onNickname(inputValue);
  };

  render() {
    return (
      <form id="form" className="input-nickname-form" onSubmit={this.handleSubmit}>
        <label className="input-nickname-form__label" htmlFor="message">
          INPUT YOUR NICKNAME:
        </label>
        <input
          className="input-nickname-form__input"
          onChange={this.handleChange}
          type="text"
          id="input"
          autoFocus
          autoComplete="off"
          pattern="[A-z]{3,}"
          maxLength="9"
          required
        />
      </form>
    );
  }
}

Form.propTypes = {
  onNickname: PropTypes.func.isRequired,
};

export default Form;
