import React from "react";
import axios from "axios";
import TripCard from "./TripCard";

class Profile extends React.Component {
  state = {
    trips: [],
    liked_trips: [],
    button_state_trips: true,
    button_style_trips: "sort-button-active",
    button_state_favs: false,
    button_style_favs: "sort-button"
  };

  componentDidMount() {
    this.getData();
    // this.tripsFilter();
  }

  getData = () => {
    // console.log("getData()");
    axios.get("/api/trips/user").then(response => {
      if (this.state.button_state_trips) {
        this.setState({
          trips: response.data,
          button_style_trips: "sort-button-active",
          button_style_favs: "sort-button"
        });
      }
    });
  };

  showFavorites = () => {
    axios.get(`/api/trips/trips/likedtrips`).then(response => {
      if (!this.state.button_state_favs) {
        this.setState({
          trips: response.data,
          button_style_favs: "sort-button-active",
          button_style_trips: "sort-button"
        });
      }

      console.log("Marcel is testing this shiz", this.state.liked_trips);
    });
  };

  deleteOne = id => {
    console.log(id);
    let filteredArray = this.state.trips.filter(elem => {
      console.log(elem);
      return id !== elem._id;
    });
    this.setState({
      trips: filteredArray
    });
  };

  render() {
    console.log("the arry", this.state.trips);
    return (
      <div className="wrapper">
        <div className="profile-wrapper">
          <div className="info-wrapper">
            {/* <div>
              <img className="profile-img" src={this.props.user.profilePic} alt="Profile Image" />
            </div> */}

            <div className="profile-img-wrapper">
              {this.props.user.profilePic ? (
                <img
                  className="profile-img"
                  src={this.props.user.profilePic}
                  alt="Profile"
                />
              ) : (
                <img
                  className="profile-img"
                  src="./img/user_avatar.png"
                  alt="Profile"
                />
              )}
            </div>

            <h2>
              {this.props.user.firstName} {this.props.user.lastName}
            </h2>
            <p>{this.props.user.email}</p>
          </div>
        </div>
        <div className="trips-wrapper">
          <div className="sort-button-wrapper">
            <button
              className={this.state.button_style_trips}
              onClick={this.getData}
            >
              My Trips
            </button>
            {
              <button
                className={this.state.button_style_favs}
                onClick={this.showFavorites}
              >
                {/* {this.state.trips.includes(trip._id)} */}
                My Favorites
              </button>
            }
          </div>
          <TripCard deleteOne={this.deleteOne} trips={this.state.trips} />
        </div>
      </div>
    );
  }
}

export default Profile;
