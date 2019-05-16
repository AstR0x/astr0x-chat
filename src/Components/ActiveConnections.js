import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default ({users, connections}) => {
    return (
        <div className="active-connections-block">
            <h2 className="active-connections-block__header">Active connections: {connections}</h2>
            <ReactCSSTransitionGroup
                transitionName="connections-slide"
                transitionAppear={true}
                transitionAppearTimeout="500"
                transitionEnterTimeout="500"
                transitionLeaveTimeout="500">{users.map(user => <li style={{color: user.color}}>{user.nickname}</li>)}
            </ReactCSSTransitionGroup>
        </div>
    )
}