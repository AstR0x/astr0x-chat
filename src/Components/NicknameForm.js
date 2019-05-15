import React, { Component } from 'react'


class Form extends Component {

    state = {
        inputValue: ''
    };

    handleChange = event => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onNickname(this.state.inputValue);
    };

    render() {
        return (
            <form id="form" className="input-nickname-form" onSubmit={this.handleSubmit}>
                <label className="input-nickname-form__label" htmlFor="message">INPUT YOUR NICKNAME:</label>
                <input className="input-nickname-form__input"
                       onChange={this.handleChange}
                       type="text"
                       id="input"
                       autoFocus
                       autoComplete="off"
                       pattern="[A-z]{3,}"
                       maxLength="9"
                       required />
            </form>
        )
    }
}

export default Form;