import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

function MessagesList({ messages }) {
  return (
    <ReactCSSTransitionGroup
      component="ul"
      transitionName="message-slide"
      className="messages-list"
      transitionAppearTimeout="500"
      transitionEnterTimeout="500"
      transitionLeaveTimeout="500"
    >
      {messages.map(message => (
        <li className="messages-list__message">
          <span className="messages-list__nickname" style={{ color: message.color }}>
            {message.nickname ? `${message.nickname}: ` : null}
          </span>
          <span className="messages-list__text" style={{ color: message.color }}>
            {message.text}
          </span>
          <span className="messages-list__time">
            {` ${message.time.slice(0, message.time.length - 3)}`}
          </span>
        </li>
      ))}
    </ReactCSSTransitionGroup>
  );
}

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MessagesList;
