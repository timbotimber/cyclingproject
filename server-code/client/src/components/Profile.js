import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TripCard from "./TripCard";

class Profile extends React.Component {
  // state = {};

  render() {
    console.log("props", this.props.setUser);
    console.log("user", this.props.user);
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

            {/* <TripCard /> */}
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
