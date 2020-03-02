import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
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
      .post("/api/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.props.setUser(response.data);
        this.props.history.push("/plotview");
      })
      .catch(err => {
        console.log("error test");
        this.setState({
          message: err.response.data.message
        });
        console.log("message", this.state.message);
      });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>Log in</h2>
          <div className="auth-form">
            <form onSubmit={this.handleSubmit}>
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
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button className="auth-btn" type="submit">
                  Log in
                </button>
              </div>
            </form>
            <div>
              <Link to="api/auth/google">
                {" "}
                <button className="auth-btn google-btn">
                  Log in with Google
                </button>
              </Link>
            </div>
          </div>
          {this.state.message && <p>{this.state.message}</p>}
        </div>
      </div>
    );
  }
}
