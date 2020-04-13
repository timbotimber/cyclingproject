'use strict';
const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcryptjs');
const passport    = require('passport');
const { users } = require('../db');
const User        = require('../models/users');

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email can't be empty" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'password is too short' });
  }

  users.getUserByEmail(email)
    .catch(() => res.status(500).json({ message: 'Error while authorizing' }))
    .then(user => {
      if (user !== false) {
        return res.status(400).json({ message: 'email is already in use' });
      }
      bcrypt
        .genSalt()
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => users.createUser({ email: email, password: hash }))
        .then(newUser => {
          req.login(newUser, err => {
            if (err) {
              throw err;
            }
            else {
              res.json({
                id: newUser.id,
                email: newUser.email
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ message: 'error while trying to register user'})
        });
    });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging in' });
      }
      res.json(user);
    });
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
});

router.get('/loggedin', (req, res) => {
  res.json(req.user);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    successRedirect: process.env.CLIENT_PROFILE_URL,
  })
);

router.get('/likedtrips', (req, res) => {
  User.findById(req.user._id)
    .then(user => res.json(user.liked_trips))
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/usertrips', (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
