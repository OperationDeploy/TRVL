import React from 'react';
import PropTypes from 'prop-types';
import logo from '../src/logo.png';

const Splash = ({ login }) => (
  <div>
    <img src={logo} alt="Logo" />
    <div onClick={login} />
  </div>
);

Splash.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Splash;
