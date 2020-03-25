// import React, { Component } from 'react';
// import TripCard from './TripCard';
// import FilterPanel from './FilterPanel';
// import axios from 'axios';

// export default class Trips extends Component {
//   // state = {
//   //   trips: [],
//   //   query: '',
//   //   filteredTrips: [],
//   //   Easy: false,
//   //   Intermediate: false,
//   //   Advanced: false,
//   //   oneDay: false,
//   //   threeDay: false,
//   //   oneWeek: false,
//   //   hardcore: false,
//   // };

//   // componentDidMount() {
//   //   getData();
//   // }

//   // getData = () => {
//   //   // console.log("getData()");
//   //   axios.get('/api/trips/addTrip').then(response => {
//   //     setState({
//   //       trips: response.data,
//   //       filteredTrips: response.data,
//   //     });
//   //   });
//   // };

//   updateSearchText = text => {
//     console.log('onchange query', text);
//     setState({
//       query: text,
//     });
//   };

//   executeSearch = () => {
//     let filteredTrips = state.trips.filter(obj => {
//       if (
//         obj.title.includes(state.query) ||
//         obj.origin_name.includes(state.query) ||
//         obj.destination_name.includes(state.query)
//       ) {
//         return true;
//       }
//     });

//     console.log('filtered', filteredTrips);

//     setState({
//       filteredTrips: filteredTrips,
//     });
//   };

//   mutateCheckboxBoolean = e => {
//     let key = e.target.name;
//     setState({ [key]: !state[key] }, () => {
//       console.log(key, state[key]);
//     });
//   };

//   executeFilter = e => {
//     e.preventDefault();

//     let filteredTrips = state.trips.filter(trip => {
//       return (
//         (state.Easy && trip.difficulty === 'Easy') ||
//         (state.Intermediate && trip.difficulty === 'Intermediate') ||
//         (state.Advanced && trip.difficulty === 'Advanced') ||
//         (state.oneDay && trip.duration <= 360) ||
//         (state.threeDay && 360 <= trip.duration <= 1080) ||
//         (state.oneWeek && 1080 <= trip.duration <= 2520) ||
//         (state.hardcore && trip.duration > 2520)
//       );
//     });

//     setState({
//       filteredTrips: filteredTrips,
//     });
//   };

//   deleteOne = id => {
//     console.log(id);
//     let filteredArray = state.filteredTrips.filter(elem => {
//       console.log(elem);
//       return id !== elem._id;
//     });
//     setState({
//       filteredTrips: filteredArray,
//     });
//   };

//   render() {

//     console.log(state.filteredTrips);
//     return (
//       <div className="wrapper">
//         <div className="filter-wrapper">
//           <FilterPanel
//             updateSearchText={updateSearchText}
//             easy={state.easy}
//             mutate={mutateCheckboxBoolean}
//             query={state.query}
//             executeSearch={executeSearch}
//             executeFilter={executeFilter}
//           />
//         </div>
//         {/* <Search
//           updateSearchText={updateSearchText}
//           query={state.query}
//           executeSearch={executeSearch}
//         /> */}
//         <div className="trips-wrapper">
//           <TripCard deleteOne={deleteOne} trips={state.filteredTrips} />
//         </div>
//       </div>
//     );
//   }
// }

import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import FilterPanel from './FilterPanel';
import axios from 'axios';

const Trips = () => {
  const [state, setState] = useState({
    trips: [],
    query: '',
    filteredTrips: [],
    Easy: false,
    Intermediate: false,
    Advanced: false,
    oneDay: false,
    threeDay: false,
    oneWeek: false,
    hardcore: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('/api/trips/addTrip').then(response => {
      setState({ ...state, trips: response.data, filteredTrips: response.data });
    });
  };

  const updateSearchText = text => {
    console.log('onchange query', text);
    setState({ ...state, query: text });
  };

  const executeSearch = () => {
    let filteredTrips = state.trips.filter(obj => {
      if (
        obj.title.includes(state.query) ||
        obj.origin_name.includes(state.query) ||
        obj.destination_name.includes(state.query)
      ) {
        return true;
      }
    });
    setState({ ...state, filteredTrips: filteredTrips });
  };

  const mutateCheckboxBoolean = e => {
    let key = e.target.name;
    setState({ [key]: !state[key] }, () => {});
  };

  const executeFilter = e => {
    e.preventDefault();

    let filteredTrips = state.trips.filter(trip => {
      return (
        (state.Easy && trip.difficulty === 'Easy') ||
        (state.Intermediate && trip.difficulty === 'Intermediate') ||
        (state.Advanced && trip.difficulty === 'Advanced') ||
        (state.oneDay && trip.duration <= 360) ||
        (state.threeDay && 360 <= trip.duration <= 1080) ||
        (state.oneWeek && 1080 <= trip.duration <= 2520) ||
        (state.hardcore && trip.duration > 2520)
      );
    });

    setState({
      filteredTrips: filteredTrips,
    });
  };

  const deleteOne = id => {
    let filteredArray = state.filteredTrips.filter(elem => {
      console.log(elem);
      return id !== elem._id;
    });
    setState({ ...state, filteredTrips: filteredArray });
  };

  return (
    <div className="wrapper">
      <div className="filter-wrapper">
        <FilterPanel
          updateSearchText={updateSearchText}
          easy={state.easy}
          mutate={mutateCheckboxBoolean}
          query={state.query}
          executeSearch={executeSearch}
          executeFilter={executeFilter}
        />
      </div>
      {/* <Search
        updateSearchText={updateSearchText}
        query={state.query}
        executeSearch={executeSearch}
      /> */}
      <div className="trips-wrapper">
        <TripCard deleteOne={deleteOne} trips={state.filteredTrips} />
      </div>
    </div>
  );
};

export default Trips;
