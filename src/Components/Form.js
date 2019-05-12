import React, { Component } from 'react'


class Form extends Component {

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
            <form id="form" onSubmit={this.handleSubmit}>
                <label htmlFor="message">&gt;</label>
                <input onChange={this.handleChangeValue}
                       type="text"
                       required
                       autoFocus
                       ref="message"
                       autoComplete="off" />
            </form>
        )
    }
}

export default Form;