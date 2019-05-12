import React, { Component } from 'react'


class MessagesForm extends Component {

    state = {
        inputValue: ''
    };

    handleChangeValue = event => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onMessage(this.state.inputValue);
        this.setState({inputValue: ''});
        this.refs.message.value = '';
    };


    render() {
        return (
            <form className="messages-form" onSubmit={this.handleSubmit}>
                <label className="messages-form__label" htmlFor="message">&gt;</label>
                <input
                    className="messages-form__input"
                    type="text"
                    required
                    autoFocus
                    ref="message"
                    autoComplete="off"
                    onChange={this.handleChangeValue} />
            </form>
        )
    }
}

export default MessagesForm;