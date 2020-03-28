import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import api from '../api';

const Profile = props => {
  const [trips, setTrips] = useState([]);
  const [buttonStateTrips, setButtonStateTrips] = useState(true);
  const [buttonStyleTrips, setButtonStyleTrips] = useState('sort-button-active');
  const [buttonStateFav, setButtonStateFav] = useState(false);
  const [buttonStyleFavs, setButtonStyleFavs] = useState('sort-button');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api.getUserTrips.then(response => {
      if (buttonStateTrips) {
        setTrips(response.data);
        setButtonStyleTrips('sort-button-active');
      }
    });
  };

  const showFavorites = () => {
    api.getLikedTrips().then(response => {
      if (!buttonStateFav) {
        setTrips(response.data);
        setButtonStateFav('sort-button');
      }
    });
  };

  const deleteOne = id => {
    let filteredArray = trips.filter(elem => {
      return id !== elem._id;
    });
    setTrips(filteredArray);
  };

  return (
    <div className="wrapper">
      <div className="profile-wrapper">
        <div className="info-wrapper">
          <div className="profile-img-wrapper">
            {props.user.profilePic ? (
              <img className="profile-img" src={props.user.profilePic} alt="Profile" />
            ) : (
              <img className="profile-img" src="./img/user_avatar.png" alt="Profile" />
            )}
          </div>

          <h2>
            {props.user.firstName} {props.user.lastName}
          </h2>
          <p>{props.user.email}</p>
        </div>
      </div>
      <div className="trips-wrapper">
        <div className="sort-button-wrapper">
          <button className={buttonStyleTrips} onClick={getData}>
            My Trips
          </button>
          <button className={buttonStyleFavs} onClick={showFavorites}>
            My Favorites
          </button>
        </div>
        <TripCard deleteOne={deleteOne} user={props.user} trips={trips} />
      </div>
    </div>
  );
};

export default Profile;
