import React from 'react'

export default (props) => {
  return (
      <div className="active-connections-block">
        <h2 className="active-connections-block__header">Active connections: {props.connections}</h2>
        <ul>
          {props.users.map(elem => <li>{elem.nickname}</li>)}
        </ul>
      </div>
  )
}