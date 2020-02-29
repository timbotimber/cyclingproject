import React, { Component } from "react";
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

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button type="submit">Log in</button>
        </form>
        {this.state.message && <p>{this.state.message}</p>}

        <a href="/auth/google">Login With Google</a>
      </>
    );
  }
}
