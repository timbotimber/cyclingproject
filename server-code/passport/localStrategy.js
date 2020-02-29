const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// We'll need to pass email parameters through later:
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      // Look for an existing user with the given email
      User.findOne({ email: email })
        .then(userDocument => {
          // If user doesn't exist, return error
          if (!userDocument) {
            done(null, false, { message: "Incorrect credentials" });
            return;
          }
          // Compare entered password with password associated with userDocument
          bcrypt.compare(password, userDocument.password).then(match => {
            // If doesn't match, return error
            if (!match) {
              done(null, false, { message: "Incorrect credentials" });
              return;
            }
            console.log(userDocument);
            // If user exists and password matches then log the user in
            done(null, userDocument);
          });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
