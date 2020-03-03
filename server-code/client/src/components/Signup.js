import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/auth/signup", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        // redirect
        // update state for user in <App/>
        this.props.setUser(response.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("error test", err.response.data.message);
        this.setState({
          message: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Create an Account</h2>

          <div className="auth-form">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="firstName"></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="first name (like Marcel)"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName"></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="last name (like Riek)"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button className="auth-btn" type="submit">
                  Sign up
                </button>
              </div>
            </form>
            <p>or...</p>
            <div>
              <a href={`${process.env.REACT_APP_SERVER_URL}/api/auth/google`}>
                {" "}
                <button className="auth-btn google-btn">
                  Sign up with Google
                </button>
              </a>
            </div>
          </div>
          {this.state.message && <p>{this.state.message}</p>}
        </div>
      </div>
    );
  }
}
