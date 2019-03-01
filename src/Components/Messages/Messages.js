import React from 'react'

export default (props) => {
  return (
      <ul id="messages">
        {props.messages.map(elem => <li>{elem}</li>)}
      </ul>
  )
}