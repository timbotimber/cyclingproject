const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: _____,
      clientSecret: ____,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google account details:", profile);

      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id })
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }
  )
);
