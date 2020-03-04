import React from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import PlotView from "./components/PlotView";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TripReview from "./components/TripReview";
import Trips from "./components/Trips";
import Profile from "./components/Profile";
import TripDetail from "./components/TripDetail";
import Home from "./components/Home";
// import Test from './components/Test';

// testing out context:
// create new context
// const MyContext = React.createContext();

// // create provider component
// class MyProvider extends React.Component {
//   state = {
//     user: this.props.user
//   };

//   render() {
//     return (
//       <MyContext.Provider value={{ state: this.state }}>
//         {this.props.children}
//       </MyContext.Provider>
//     );
//   }
// }

// Context test until here ----------------------------

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
    // const id = this.props.match.params.tripId;
    return (
      // <MyProvider>
      <div className="App">
        <NavBar setUser={this.setUser} user={this.state.user} />
        <div className="content">
          <Route exact path="/" component={Home} />
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
          <Route exact path="/trips" component={Trips} />
          <Route path="/trip/:id" component={TripDetail} />
          <Route
            path="/profile"
            render={props => (
              <Profile setUser={this.setUser} user={this.state.user} />
            )}
          />
        </div>
      </div>
      // </MyProvider>
    );
  }
}

export default App;
