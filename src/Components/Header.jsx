import React from 'react';
import PropTypes from 'prop-types';

function Header({ status }) {
  return (
    <header className="header">
      <h1>Astr0xChat</h1>
      <span className="header__status">{status}</span>
    </header>
  );
}

Header.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Header;
