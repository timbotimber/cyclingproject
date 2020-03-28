import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import FilterPanel from './FilterPanel';
import api from '../api';

const Trips = props => {
  const [state, setState] = useState({
    user: props.user,
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
    api.getAddTrip().then(response => {
      setState({ ...state, trips: response.data, filteredTrips: response.data });
    });
  };

  const updateSearchText = text => {
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
    setState({ ...state, [key]: !state[key] }, () => {});
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
      <div className="trips-wrapper">
        <TripCard user={state.user} deleteOne={deleteOne} trips={state.filteredTrips} />
      </div>
    </div>
  );
};

export default Trips;
