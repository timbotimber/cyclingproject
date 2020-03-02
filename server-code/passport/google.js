const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "186909102539 -kmsc91b6jp2h6dumt91usu51uqjfdpk5.apps.googleusercontent.com",
      clientSecret: "dfqiGieaieU-WJ0KT1mDk4vj",
      callbackURL: "http://localhost:5000/api/auth/auth/google/callback"
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

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
