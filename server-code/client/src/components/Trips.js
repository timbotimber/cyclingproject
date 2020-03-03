import React, { Component } from "react";
import TripCard from "./TripCard";
import Search from "./Search";
import FilterPanel from "./FilterPanel";
import axios from "axios";

let tripsData;

export default class Trips extends Component {
  state = {
    trips: [],
    query: "",
    filteredTrips: [],
    Easy: false,
    Intermediate: false,
    Advanced: false,
    oneDay: false,
    threeDay: false,
    oneWeek: false,
    hardcore: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // console.log("getData()");
    axios.get("/api/trips/addTrip").then(response => {
      tripsData = response.data;
      this.setState({
        trips: tripsData,
        filteredTrips: tripsData
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
    this.setState({ [key]: !this.state[key] }, () => {
      console.log(key, this.state[key]);
    });
  };

  executeFilter = e => {
    e.preventDefault();

    let filteredTrips = this.state.trips.filter(trip => {
      return (
        (this.state.Easy && trip.difficulty === "Easy") ||
        (this.state.Intermediate && trip.difficulty === "Intermediate") ||
        (this.state.Advanced && trip.difficulty === "Advanced") ||
        (this.state.oneDay && trip.duration <= 360) ||
        (this.state.threeDay && 360 < trip.duration <= 1080) ||
        (this.state.oneWeek && 1080 < trip.duration <= 2520) ||
        (this.state.hardcore && trip.duration > 2520)
      );
    });

    this.setState({
      filteredTrips: filteredTrips
    });

    if (
      !this.state.Easy &&
      !this.state.Intermediate &&
      !this.state.Advanced &&
      !this.state.oneDay &&
      !this.state.threeDay &&
      !this.state.oneWeek & !this.state.hardcore
    ) {
      this.setState({ filteredTrips: tripsData });
    }

    // let query = {};

    // Object.keys(this.state).forEach(key => {
    //   console.log("object values", key);
    //   if (this.state[key] === true) {
    //     query[key] = this.state[key];
    //     // queryKeys.push(key);
    //   }
    //   return query;
    // });
    // console.log("done arr", query);

    // let filteredResults = this.state.trips.filter(search, query);

    // function search(trip) {
    //   return Object.keys(this).every(key => trip[key] === this[key]);
    // }

    // console.log("filteredResults", filteredResults);

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
          <TripCard trips={this.state.filteredTrips} />
        </div>
      </div>
    );
  }
}
