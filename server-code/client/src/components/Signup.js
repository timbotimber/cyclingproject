import React, { Component } from "react";
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
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button type="submit">Sign up</button>
        </form>
        {this.state.message && <p>{this.state.message}</p>}
      </>
    );
  }
}
