import React from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import './App.css';
import PlotView from './components/PlotView';
import NavBar from './components/NavBar';
import Login from './components/Login';
import TripReview from './components/TripReview';
import Trips from './components/Trips';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Route path="/plotview" component={PlotView} />
        <Route path="/login" component={Login} />
        <Route path="/trips" component={Trips} />
        <Test></Test>
      </div>
    </div>
  );
}

export default App;
