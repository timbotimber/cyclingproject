const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTripSchema = new Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  liked: Boolean,
});

const Trip = mongoose.model("UserTrip", userTripSchema);
module.exports = Trip;