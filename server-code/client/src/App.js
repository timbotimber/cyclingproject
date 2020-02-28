import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PlotView from "./components/PlotView";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <PlotView />
    </div>
  );
}

export default App;
