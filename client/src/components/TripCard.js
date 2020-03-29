import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const TripCard = props => {
  const [userInfo, setUserInfo] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getData();
    getUserTrips();
  }, []);

  const getData = () => {
    api.getLikedTrips().then(response => {
      setUserInfo(response.data);
    });
  };

  const getUserTrips = () => {
    api.getUserTrips().then(response => {
      setUserTrips(response.data);
    });
  };

  const faveTrip = id => {
    api.faveTrip(id).then(response => {
      setUserInfo(response.data.liked_trips);
    });
  };

  const deleteTrip = id => {
    api.deleteTrip(id).then(response => {
      props.deleteOne(id);
    });
  };

  return (
    <div className="trips-list">
      {props.trips.map(trip => {
        return (
          <div key={trip._id} className="trip-card">
            <div className="primary-content">
              <div>
                <h2>
                  <Link to={`/trip/${trip._id}`}>{trip.title}</Link>
                </h2>
                <p>From: {trip.origin_name}</p>
                <p>To: {trip.destination_name}</p>
                {/* <p>Duration: {(props.duration / 60).toFixed(2)} hours</p> */}
              </div>
              <div key={trip._id} className="favebutton">
                <div onClick={() => faveTrip(trip._id, trip)}>
                  {userInfo.includes(trip._id) ? (
                    <>
                      <img className="heart" src="./img/heart.png" alt="heart" />
                    </>
                  ) : (
                    <>
                      <img className="heart" src="./img/empty_heart.png" alt="empty heart" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="secondary-content">
              <div>
                <p className="caption">Difficulty</p>
                <p className="attribute">{trip.difficulty ? trip.difficulty : 'N/A'}</p>
              </div>

              <div>
                <p className="caption">Distance</p>
                <p className="attribute">{trip.distance.toFixed(2)} km</p>
              </div>

              <div>
                <p className="caption">Duration</p>
                <p className="attribute">{(trip.duration / 60).toFixed(2)} hrs</p>
              </div>

              <div>
                <p className="caption">Elevation gain</p>
                <p className="attribute">
                  <Link to={`chart/${trip._id}`}>{trip.elevation_gain ? trip.elevation_gain + ' m' : 'N/A'}</Link>
                </p>
              </div>

              <div className="delete-attribute">
                {userTrips._id === trip.user ? (
                  <button onClick={() => deleteTrip(trip._id)}>
                    <img src="/img/trash_icon.png" alt="delete" />
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripCard;
