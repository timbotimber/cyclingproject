const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const UserTrip = require('../models/UserTrip');

router.get('/addTrip', (req, res) => {
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/user', (req, res) => {
  Trip.find({ user: req.user._id })
    .then(trips => {
      res.json(trips);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/trip/:id', (req, res) => {
  const tripId = req.params.id;

  Trip.findById(tripId)
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/addTrip', (req, res, next) => {
  const {
    title,
    uuid,
    duration,
    distance,
    coordinates,
    waypoints,
    origin,
    origin_name,
    destination,
    destination_name,
    difficulty,
    elevations,
    elevation_gain,
  } = req.body;
  const out = Trip.create({
    title,
    uuid,
    duration,
    distance,
    coordinates,
    waypoints,
    origin,
    origin_name,
    destination,
    destination_name,
    difficulty,
    elevations,
    elevation_gain,
  })
  .catch(err => {
    res.json({ err })
  })
  .then(postTrip => {
    if (req.user && req.user._id) {
      UserTrip.create({
        user: req.user._id,
        trip: postTrip,
      })
    }
    res.json(postTrip);
  });
  next();
});

router.post('/updatefaves/:id', (req, res, next) => {
  const tripId = req.params.id;
  User.findById({ _id: req.user._id }).then(user => {
    if (user.liked_trips.includes(tripId)) {
      User.findByIdAndUpdate(user._id, { $pull: { liked_trips: tripId } }, { new: true }).then(result => {
        res.json(result);
      });
    } else {
      User.findByIdAndUpdate({ _id: req.user._id }, { $addToSet: { liked_trips: tripId } }, { new: true }).then(
        result => {
          res.json(result);
        }
      );
    }
  });
});

router.post('/delete/:id', (req, res) => {
  const tripId = req.params.id;
  Trip.findOneAndDelete({ _id: tripId })
    .then(user => {
      res.json({ message: 'deleted' });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/trips/likedtrips', (req, res) => {
  User.findById(req.user._id)
    .populate('liked_trips')
    .then(user => {
      res.json(user.liked_trips);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
