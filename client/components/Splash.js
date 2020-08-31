import React from 'react';
import logo from '../src/logo.png';

// when user visits the domain they will see or logo and google login button
// TODO: styling

const Splash = () => (
  <div>
    <img src={logo} alt="Logo" />
    <div>google login here</div>
  </div>
);

export default Splash;
