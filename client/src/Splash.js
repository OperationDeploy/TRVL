import React from 'react';
import logo from './logo.png';

// when user visits the domain they will see or logo and google login button
// styling will be done at a later time

const Splash = ({}) => {
  return (
    <div>
      <img src={logo} alt="Logo" /> 
      <div>"google login here"</div>
    </div>
  );
};

export default Splash; 