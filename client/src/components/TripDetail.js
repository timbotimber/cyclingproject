import React, { Component } from "react";
import axios from "axios";
import MapView from "./MapViewDetail";

export default class TripDetail extends Component {
  state = {
    trip: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    console.log("ide value", id);

    axios.get(`/api/trips/trip/${id}`).then(response => {
      console.log("response", response);
      this.setState({
        trip: response.data
      });
      console.log("Test the state:", this.state);
    });
  }

  render() {
    {
      const trip = this.state.trip;

      if (!trip) {
        return <div>No Trips Match Your Search</div>;
      }
      return (
        <>
          <h1>{trip.title}</h1>
          <p>{trip.duration}</p>
          <p>{trip.distance}</p>
          <MapView coordinates={trip.coordinates} origin={trip.origin} />
        </>
      );
    }
  }
}
