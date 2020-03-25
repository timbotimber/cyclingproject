// import React, { Component } from 'react';
// import axios from 'axios';
// import MapView from './MapViewDetail';

// export default class TripDetail extends Component {
//   state = {
//     trip: null,
//   };

//   componentDidMount() {
//     const id = this.props.match.params.id;

//     console.log('ide value', id);

//     axios.get(`/api/trips/trip/${id}`).then(response => {
//       console.log('response', response);
//       this.setState({
//         trip: response.data,
//       });
//       console.log('Test the state:', this.state);
//     });
//   }

//   render() {
//     const trip = this.state.trip;

//     if (!trip) {
//       return <div>Jackie and the Ferry Boys working their magic... </div>;
//     }
//     return (
//       <>
//         <MapView coordinates={trip.coordinates} origin={trip.origin} />
//       </>
//     );
//   }
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './MapViewDetail';

const TripDetail = props => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const id = props.match.params.id;
    console.log('ide value', id);
    axios.get(`/api/trips/trip/${id}`).then(response => {
      console.log('response', response);
      setTrip(response.data);
      console.log('Test the state:', trip);
    });
  }, []);

  return !trip ? (
    <div>Jackie and the Ferry Boys working their magic... </div>
  ) : (
    <MapView coordinates={trip.coordinates} origin={trip.origin} />
  );
};

export default TripDetail;
