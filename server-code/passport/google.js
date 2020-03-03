const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google account details:", profile);
      console.log("this is supposed to be the photo?", profile.photos[0].value);
      console.log(Object.keys(profile));

      User.findOne({ googleID: profile.id }).then(found => {
        if (found) {
          // console.log(found);
          done(null, found); // Found is referring to the user
        } else {
          User.create({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            profilePic: profile.photos[0].value,
            googleId: profile.id
          }).then(createdUser => {
            done(null, createdUser);
          });
        }

        //   User.create({ googleID: profile.id })
        //     .then(newUser => {
        //       done(null, newUser);
        //     })
        //     .catch(err => done(err));
        // })
        // .catch(err => done(err));
      });
    }
  )
);

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
