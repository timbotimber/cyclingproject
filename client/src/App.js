import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import PlotView from './components/PlotView';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Trips from './components/Trips';
import Profile from './components/Profile';
import TripDetail from './components/TripDetail';
import Home from './components/Home';
import ElevationChart from './components/ElevationChart';

const App = props => {
  const [state, setState] = useState({
    user: props.user,
  });

  const setUser = userObj => {
    setState({ ...state, user: userObj });
  };

  return (
    // <MyProvider>
    <div className="App">
      <NavBar setUser={setUser} user={state.user} />
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/plotview" component={PlotView} />
        <Route path="/login" render={props => <Login history={props.history} setUser={setUser} />} />
        <Route path="/signup" render={props => <Signup history={props.history} setUser={setUser} />} />
        <Route exact path="/trips" component={Trips} />
        <Route path="/chart/:id" component={ElevationChart} />
        <Route path="/trip/:id" component={TripDetail} />
        <Route path="/profile" render={props => <Profile setUser={setUser} user={state.user} />} />
      </div>
    </div>
    // </MyProvider>
  );
};

export default App;
