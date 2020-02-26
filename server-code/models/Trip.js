const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  origin: Array,
  destination: Array,
  duration: Number,
  distance: Number,
  elevation: {
    enum: ["Mostly flat", "Hilly", "Mountainous"],
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  difficulty: {
    enum: ["Easy", "Intermediate", "Advanced"],
    type: String
  },
  emissions: Number,
  waypoints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Waypoint"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  likes_count: Number,
  path: [[]],
  established_route: Boolean
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
