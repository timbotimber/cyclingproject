const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    trips: Array,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId, // We will have an array of Object IDs
        ref: "Comment"
      }
    ],
    liked_trips: [
      {
        type: mongoose.Schema.Types.ObjectId, // We will have an array of Object IDs
        ref: "Trip"
      }
    ],
    image: String
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
