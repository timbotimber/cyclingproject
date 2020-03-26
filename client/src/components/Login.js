import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = props => {
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
      .post('/api/auth/login', {
        email: state.email,
        password: state.password,
      })
      .then(response => {
        console.log(response.data);
        props.setUser(response.data);
        props.history.push('/plotview');
      })
      .catch(err => {
        console.log('error test');
        setState({ ...state, message: err.response.data.message });
        console.log('message', state.message);
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Log in</h2>
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
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
                id="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="auth-btn" type="submit">
                Log in
              </button>
            </div>
          </form>
          <p id="or-google">or</p>
          <div>
            <a href={`${process.env.REACT_APP_SERVER_URL}/api/auth/google`}>
              {' '}
              <button className="auth-btn sort-button">Log in with Google</button>
            </a>
          </div>
          <p id="auth-line">
            No account yet?{' '}
            <Link className="auth-links" to="/signup">
              Signup
            </Link>
          </p>
        </div>
        {state.message && <p>{state.message}</p>}
      </div>
    </div>
  );
};

export default Login;
