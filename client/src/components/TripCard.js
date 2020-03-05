import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class TripCard extends React.Component {
  state = {
    userInfo: [],
    fave: true
  };

  // checkFave = () => {
  //   this.state.userInfo.includes(trip._id) ? true : false;
  // };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios.get("/api/auth/likedtrips").then(response => {
      console.log("this is the response.data", response.data);
      // let faveChecker
      // this.checkFave();
      this.setState({
        userInfo: response.data
      });
    });
  };

  faveTrip = id => {
    console.log("Markus");
    axios.post(`/api/trips/updatefaves/${id}`).then(response => {
      console.log("Heldrup", response.data.liked_trips);

      this.setState(
        {
          // posts: response.data,
          userInfo: response.data.liked_trips
        },
        () => {
          console.log(this.state.userInfo);
        }
      );
    });
  };

  render() {
    console.log("is this the liked trip?", this.state);

    return (
      <div className="trips-list">
        {this.props.trips.map(trip => {
          return (
            <div className="trip-card">
              <div className="primary-content">
                <div>
                  <h2>
                    <Link to={`/trip/${trip._id}`}>{trip.title}</Link>
                  </h2>
                  <p>From: {trip.origin_name}</p>
                  <p>To: {trip.destination_name}</p>
                  {/* <p>Duration: {(this.props.duration / 60).toFixed(2)} hours</p> */}
                </div>
                <div className="favebutton">
                  <div onClick={() => this.faveTrip(trip._id, trip)}>
                    {this.state.userInfo.includes(trip._id) ? (
                      <>
                        <img
                          className="heart"
                          src="./img/heart.png"
                          alt="heart"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="heart"
                          src="./img/empty_heart.png"
                          alt="empty heart"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="secondary-content">
                <div>
                  <p className="caption">Difficulty</p>
                  <p className="attribute">
                    {trip.difficulty ? trip.difficulty : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="caption">Distance</p>
                  <p className="attribute">{trip.distance.toFixed(2)} km</p>
                </div>

                <div>
                  <p className="caption">Duration</p>
                  <p className="attribute">
                    {(trip.duration / 60).toFixed(2)} hrs
                  </p>
                </div>

                <div>
                  <p className="caption">Elevation gain</p>
                  <p className="attribute">
                    {trip.elevation_gain ? trip.elevation_gain + " m" : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
