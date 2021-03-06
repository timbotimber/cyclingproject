const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  origin: Array, // First pair of coordinates
  origin_name: String,
  destination: Array, // Last pair of coordinates --> currently storing the key instead of the coordinates array, need to fix!
  destination_name: String,
  duration: Number, // Comes from Mapbox
  distance: Number, // Comes from Mapbox
  coordinates: Array,
  difficulty: String,
  elevations: Array,
  elevation_gain: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }, // Auto generated
  //   difficulty: {
  //     enum: ["Easy", "Intermediate", "Advanced"],
  //     type: String
  //   },
  //   emissions: Number,
  waypoints: Array
  // [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Waypoint"
  //   }
  // ], // Comes from Mapbox, but needs modification...
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Comment"
  //     }
  //   ],
  //   likes_count: Number, //
  //   established_route: Boolean
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
