import axios from 'axios';

const apiClient = axios.create({
  timeout: 2000,
});

const getLoggedIn = () => apiClient.get('/api/auth/loggedin');
const getAddTrip = () => apiClient.get('/api/trips/addTrip');
const getTrip = id => apiClient.get(`/api/trips/trip/${id}`);
const getLikedTrips = () => apiClient.get('/api/auth/likedtrips');
const deleteTrip = id => apiClient.post(`/api/trips/delete/${id}`);
const faveTrip = id => apiClient.post(`/api/trips/updatefaves/${id}`);
const getUserTrips = () => apiClient.get('/api/trips/user');
const logoutUser = () => apiClient.delete('/api/auth/logout');

export default ({
  getLoggedIn,
  getAddTrip,
  getTrip,
  deleteTrip,
  faveTrip,
  getLikedTrips,
  getUserTrips,
  logoutUser,
});