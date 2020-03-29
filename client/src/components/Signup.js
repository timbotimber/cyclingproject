import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    message: '',
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/api/auth/signup', {
        email: state.email,
        password: state.password,
      })
      .then(response => {
        // redirect
        // update state for user in <App/>
        props.setUser(response.data);
        props.history.push('/');
      })
      .catch(err => {
        setState({ ...state, message: err.response.data.message });
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Create an Account</h2>

        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName"></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={state.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName"></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={state.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email"></label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="auth-btn" type="submit">
                Sign up
              </button>
            </div>
          </form>
          <p id="or-google">or</p>
          <div>
            <a href={`${process.env.REACT_APP_SERVER_URL}/api/auth/google`}>
              {' '}
              <button className="auth-btn sort-button">Sign up with Google</button>
            </a>
          </div>
          <p id="auth-line">
            Already have an account?{' '}
            <Link className="auth-links" to="/login">
              Login
            </Link>
          </p>
        </div>
        {state.message && <p>{state.message}</p>}
      </div>
    </div>
  );
};

export default Signup;
