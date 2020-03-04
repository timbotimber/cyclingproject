const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  displayName: String,
  profilePic: String,
  googleId: String,
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip"
    }
  ],
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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
