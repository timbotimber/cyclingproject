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

  render() {
    console.log('props', this.props.setUser);
    console.log('user', this.props.user);
    console.log('gid test', this.props.user.googleId);
    return (
      <div className="wrapper">
        <div className="profile-wrapper">
          <div className="info-wrapper">
            <div className="image-wrapper">
              <img className="profile-img" src={this.props.user.profilePic} alt="Profile Image" />
            </div>
            <h2>
              {this.props.user.firstName} {this.props.user.lastName}
            </h2>
            <p>{this.props.user.email}</p>
          </div>
        </div>
        <div className="trips-wrapper">
          <div className="my-trips-headline">
            <h2>My Trips</h2>
          </div>
          <TripCard trips={this.state.trips} />
        </div>
      </div>
    );
  }
}

export default Profile;
