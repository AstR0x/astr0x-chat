import React from 'react';


export default ({status}) => {
    return (
        <header className="header">
            <h1>Astr0xChat</h1>
            <span className="header__status">{status}</span>
        </header>
    )
}