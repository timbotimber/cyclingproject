import React, { useState, useEffect } from 'react';
import MapView from './MapViewDetail';
import api from '../api';

const TripDetail = props => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;
    api.getTrip(id).then(response => {
      setTrip(response.data);
    });
  }, []);

  return !trip ? (
    <div>Jackie and the Ferry Boys working their magic... </div>
  ) : (
    <MapView coordinates={trip.coordinates} origin={trip.origin} />
  );
};

export default TripDetail;
