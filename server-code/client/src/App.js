import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import PlotView from './components/PlotView';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import TripReview from './components/TripReview';
import Trips from './components/Trips';
import Profile from './components/Profile';
import TripDetail from './components/TripDetail';
// import Test from './components/Test';

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = userObj => {
    this.setState({
      user: userObj,
    });
  };

  render() {
    // const id = this.props.match.params.tripId;
    return (
      <div className="App">
        <NavBar setUser={this.setUser} user={this.state.user} />
        <div className="content">
          <Route path="/plotview" component={PlotView} />
          <Route path="/login" render={props => <Login history={props.history} setUser={this.setUser} />} />
          <Route path="/signup" render={props => <Signup history={props.history} setUser={this.setUser} />} />
          <Route path="/trips" component={Trips} />
          <Route path="/trip/:id" component={TripDetail} />
          <Link to="/plotview">Plan Your Next Trip</Link>
          <Link to="/trips">Discover Trips</Link>

          {/* <Route
            path="/profile"
            render={this.props => (
            <Profile user={this.setUser} />
            )}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
