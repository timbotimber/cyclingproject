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
    return (
      <div>
        {/* <MyContext.Consumer>
          {context => (
            <React.Fragment> */}
        <div>
          <h1>This is your profile</h1>
          <div>
            <div className="image-wrapper">
              <img src={this.props.user.profilePic} alt="Profile Image" />
            </div>
            <div className="profile-info-wrapper">
              <p>
                {this.props.user.firstName} {this.props.user.lastName}
              </p>
              <p>Email: {this.props.user.email}</p>
            </div>
          </div>
          <div className="my-trips-wrapper">
            <h2>My Trips</h2>
            <TripCard trips={this.state.trips}></TripCard> />
          </div>
        </div>
        {/* </React.Fragment>
          )}
        </MyContext.Consumer> */}
      </div>
    );
  }
}

export default Profile;
