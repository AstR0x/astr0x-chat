import React from 'react'

export default ({messages}) => {
    return (
        <ul id="messages">
            {messages.map(message =>
                <li>
                    <span className="messages__time">{message.time}</span>
                    <span className="messages__nickname">{message.nickname ? ' ' + message.nickname : ''}</span>
                    <span className="messages__message">{': ' + message.text}</span>
                </li>)}
        </ul>
    )
}