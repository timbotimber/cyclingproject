import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TripCard from './TripCard';

class Profile extends React.Component {
  state = {
    trips: [],
    liked_trips: [],
  };

  componentDidMount() {
    this.getData();
    // this.tripsFilter();
  }

  getData = () => {
    // console.log("getData()");
    axios.get('/api/trips/user').then(response => {
      this.setState({
        trips: response.data,
        // filteredTrips: tripsData
      });
      // console.log('jason test', this.state.trips[0].user);
      console.log('testee user', this.props.user._id);
    });
  };

  showFavorites = () => {
    axios.get(`/api/trips/trips/likedtrips`).then(response => {
      this.setState({
        trips: response.data,
      });
      console.log('Marcel is testing this shiz', this.state.liked_trips);
    });
  };

  // showFavorites = () => {
  //   axios.get("/api/auth/likedtrips").then(response => {
  //     console.log("this is the response.data", response.data);
  //     // let faveChecker
  //     // this.checkFave();
  //     this.setState({
  //       userInfo: response.data
  //     });
  //   });
  // };

  deleteOne = id => {
    console.log(id);
    let filteredArray = this.state.trips.filter(elem => {
      console.log(elem);
      return id !== elem._id;
    });
    this.setState({
      trips: filteredArray,
    });
  };

  render() {
    console.log('the arry', this.state.trips);
    return (
      <div className="wrapper">
        <div className="profile-wrapper">
          <div className="info-wrapper">
            {/* <div>
              <img className="profile-img" src={this.props.user.profilePic} alt="Profile Image" />
            </div> */}

            <div className="profile-img-wrapper">
              {this.props.user.profilePic ? (
                <img className="profile-img" src={this.props.user.profilePic} alt="Profile Image" />
              ) : (
                <img className="profile-img" src="./img/user_avatar.png" alt="Profile Image" />
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
            <button className="sort-button" onClick={this.getData}>
              My Trips
            </button>
            {
              <button className="sort-button" onClick={this.showFavorites}>
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

{
  /* <button onClick={() => this.faveTrip(trip._id, trip)}>
{this.state.userInfo.includes(trip._id)
  ? "Unfave"
  : "fave"}
</button> */
}
