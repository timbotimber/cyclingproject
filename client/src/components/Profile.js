import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TripCard from './TripCard';

class Profile extends React.Component {
  state = {
    trips: [],
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

  // showFavorites = () => {
  //   axios.get('/api/auth/likedtrips').then(response => {
  //     this.setState(
  //       {
  //         trips: response.data,
  //       },
  //       () => {
  //         console.log('Marcel is testing this shiz', this.state.trips);
  //       }
  //     );
  //   });
  // };

  render() {
    console.log('props', this.props.setUser);
    console.log('user', this.props.user);
    return (
      <div className="wrapper">
        <div className="profile-wrapper">
          <div className="info-wrapper">
            <div>
              <img className="profile-img" src={this.props.user.profilePic} alt="Profile Image" />
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
              className="sort-button"
              // onClick={() => this.showMyTrips()}
            >
              My Trips
            </button>
            <button className="sort-button" onClick={this.showFavorites()}>
              My Favorites
            </button>
          </div>
          <TripCard trips={this.state.trips} />
        </div>
      </div>
    );
  }
}

export default Profile;
