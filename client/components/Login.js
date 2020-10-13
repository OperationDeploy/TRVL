import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const Login = () => (
  <section className="intro">
    <div className="inner">
      <div className="content">
        <img
          src="https://i.ibb.co/FD0qXN8/logowithtag-1.png"
          className="photo"
          alt="login-img"
        />
        <div className="google-btn">
          <a href="/auth/google" className="google-link">
            Login With Google
          </a>
        </div>
      </div>
    </div>
  </section>
);

Login.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default Login;
