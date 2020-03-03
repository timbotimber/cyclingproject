import React, { Component } from "react";
import TripCard from "./TripCard";
import Search from "./Search";
import FilterPanel from "./FilterPanel";
import axios from "axios";

export default class Trips extends Component {
  state = {
    trips: [],
    query: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // console.log("getData()");
    axios.get("/api/trips/addTrip").then(response => {
      this.setState({
        trips: response.data
      });
    });
  };

  updateSearchText = text => {
    console.log("onchange query", text);
    this.setState({
      query: text
    });
  };

  executeSearch = () => {
    let filtered = this.state.trips.filter(obj => {
      if (
        obj.title.includes(this.state.query) ||
        obj.origin_name.includes(this.state.query) ||
        obj.destination_name.includes(this.state.query)
      ) {
        return true;
      }
    });

    this.setState({
      trips: filtered
    });
  };

  render() {
    console.log("render");
    return (
      <div className="wrapper">
        <FilterPanel
          updateSearchText={this.updateSearchText}
          query={this.state.query}
          executeSearch={this.executeSearch}
        />
        {/* <Search
          updateSearchText={this.updateSearchText}
          query={this.state.query}
          executeSearch={this.executeSearch}
        /> */}
        <TripCard trips={this.state.trips} />
      </div>
    );
  }
}
