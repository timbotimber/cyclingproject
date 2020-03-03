import React, { Component } from "react";
import TripCard from "./TripCard";
import Search from "./Search";
import FilterPanel from "./FilterPanel";
import axios from "axios";

export default class Trips extends Component {
  state = {
    trips: [],
    query: "",
    Easy: false,
    Intermediate: false,
    Advanced: false
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

  mutateCheckboxBoolean = e => {
    let key = e.target.name;
    this.setState({ [key]: !this.state[key] });
    console.log(key, this.state[key]);
  };

  executeFilter = e => {
    e.preventDefault();
    console.log("working");
    let query = {};
    Object.keys(this.state).forEach(key => {
      console.log("object values", key);
      if (this.state[key] === true) {
        query[key] = this.state[key];
        // queryKeys.push(key);
      }
      return query;
    });
    console.log("done arr", query);

    let filteredResults = this.state.trips.filter(search, query);

    function search(trip) {
      return Object.keys(this).every(key => trip[key] === this[key]);
    }

    console.log("filteredResults", filteredResults);

    // let filteredList = this.state.trips.filter(trip => {
    //   for (const key in truthy) {
    //     if (trip[key] !== truthy[key]) return false;
    //   }
    //   return true;
    // });

    // console.log("filtered list:", filteredList);

    // users= users.filter(function(item) {
    //   for (var key in filter) {
    //     if (item[key] === undefined || item[key] != filter[key])
    //       return false;
    //   }
    //   return true;
    // });

    // const place = features.find(el => el.place_type.includes("place"));
    // if (place) {
    //   this.setState({ destination_name: place.place_name });
    //   return;
    // }

    // let filteredList = this.state.trips.filter(trip => {
    //   for (const key of arr) {
    //     if (trip.key) {
    //       return true;
    //     }
    //   }
    // });
    // console.log(filteredList);
  };

  render() {
    return (
      <div className="wrapper">
        <div className="filter-wrapper">
          <FilterPanel
            updateSearchText={this.updateSearchText}
            easy={this.state.easy}
            mutate={this.mutateCheckboxBoolean}
            query={this.state.query}
            executeSearch={this.executeSearch}
            executeFilter={this.executeFilter}
          />
        </div>
        {/* <Search
          updateSearchText={this.updateSearchText}
          query={this.state.query}
          executeSearch={this.executeSearch}
        /> */}
        <div className="trips-wrapper">
          <TripCard trips={this.state.trips} />
        </div>
      </div>
    );
  }
}
