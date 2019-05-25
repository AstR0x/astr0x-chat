import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

function ActiveConnections({ users, connections }) {
  return (
    <div className="active-connections-block">
      <h2 className="active-connections-block__header">
        Active connections:
        {connections}
      </h2>
      <ReactCSSTransitionGroup
        transitionName="connections-slide"
        transitionAppear
        transitionAppearTimeout="500"
        transitionEnterTimeout="500"
        transitionLeaveTimeout="500"
      >
        {users.map(user => (
          <li style={{ color: user.color }}>{user.nickname}</li>
        ))}
      </ReactCSSTransitionGroup>
    </div>
  );
}

ActiveConnections.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  connections: PropTypes.number.isRequired,
};

export default ActiveConnections;
