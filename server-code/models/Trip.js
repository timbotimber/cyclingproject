const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  // title: String,
  // origin: Array, // First waypoint
  // destination: Array, // Last waypoint
  duration: Number, // Comes from Mapbox
  distance: Number, // Comes from Mapbox
  coordinates: Array,
  //   elevation: {
  //     enum: ["Mostly flat", "Hilly", "Mountainous"],
  //     type: String
  //   },
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   }, // Auto generated
  //   difficulty: {
  //     enum: ["Easy", "Intermediate", "Advanced"],
  //     type: String
  //   },
  //   emissions: Number,
  //   waypoints: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Waypoint"
  //     }
  //   ], // Comes from Mapbox, but needs modification...
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Comment"
  //     }
  //   ],
  //   likes_count: Number, //
  //   geometry: {}, // Comes from Mapbox
  //   established_route: Boolean
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
