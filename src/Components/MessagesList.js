import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default ({messages}) => {

    const fifteenMessages = messages.length > 20 ?
        messages.slice(messages.length - 20)
        : messages;


    return (
        <ReactCSSTransitionGroup
            component="ul"
            transitionName="message-slide"
            className="messages-list"
            transitionAppearTimeout="500"
            transitionEnterTimeout="500"
            transitionLeaveTimeout="500">
            {fifteenMessages.map(message =>
                <li className="messages-list__message">
                    <span className="messages-list__time">{message.time}</span>
                    <span className="messages-list__nickname" style={{color: message.color}}>{message.nickname ? ' ' + message.nickname : ''}</span>
                    <span className="messages-list__message" style={{color: message.color}}>{': ' + message.text}</span>
                </li>)}
        </ReactCSSTransitionGroup>
    )
}