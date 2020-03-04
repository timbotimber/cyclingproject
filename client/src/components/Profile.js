import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TripCard from "./TripCard";

class Profile extends React.Component {
  state = {
    trips: []
  };

  componentDidMount() {
    this.getData();
    // this.tripsFilter();
  }

  getData = () => {
    // console.log("getData()");
    axios.get("/api/trips/user").then(response => {
      this.setState({
        trips: response.data
        // filteredTrips: tripsData
      });
      // console.log('jason test', this.state.trips[0].user);
      console.log("testee user", this.props.user._id);
    });
  };

  render() {
    console.log("props", this.props.setUser);
    console.log("user", this.props.user);
    return (
      <div className="profile-container">
        <div className="info-wrapper">
          <h2>
            {this.props.user.firstName} {this.props.user.lastName}
          </h2>
          <div className="image-wrapper">
            <img
              className="profile-img"
              src={this.props.user.profilePic}
              alt="Profile Image"
            />
          </div>
          <p>
            Email: <span>{this.props.user.email}</span>
          </p>
        </div>
        <div className="my-trips-wrapper">
          <h2>My Trips</h2>
          <div>{/* <TripCard /> */}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
