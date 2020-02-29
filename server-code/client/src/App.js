import React from "react";
import logo from "./logo.svg";
import { Route } from "react-router-dom";
import "./App.css";
import PlotView from "./components/PlotView";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TripReview from "./components/TripReview";
import Trips from "./components/Trips";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar setUser={this.setUser} user={this.state.user} />
        <div className="content">
          <Route path="/plotview" component={PlotView} />
          <Route
            path="/login"
            render={props => (
              <Login history={props.history} setUser={this.setUser} />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <Signup history={props.history} setUser={this.setUser} />
            )}
          />
          <Route path="/trips" component={Trips} />
        </div>
      </div>
    );
  }
}

export default App;
