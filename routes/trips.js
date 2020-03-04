const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Trip = require("../models/Trip");

router.get("/addTrip", (req, res) => {
  Trip.find()
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/user", (req, res) => {
  Trip.find({ user: req.user._id })
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/trip/:id", (req, res) => {
  const tripId = req.params.id;
  console.log("hi", req);

  Trip.findById(tripId)
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.post("/addTrip", (req, res, next) => {
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
    user
  } = req.body;
  Trip.create({
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
    user: req.user._id
  }).then(postTrip => {
    res.json(postTrip);
  });
  console.log(req.body);
});

// router.get("/search", (req, res) => {
//   console.log("req.body", req.body);
// });

router.post("/updatefaves/:id", (req, res, next) => {
  const tripId = req.params.id;
  console.log(tripId, "TRIPPPPID ");
  User.findById({ _id: req.user._id }).then(user => {
    if (user.liked_trips.includes(tripId)) {
      User.findByIdAndUpdate(
        user._id,
        { $pull: { liked_trips: tripId } },
        { new: true }
      ).then(res => {
        console.log(res);
      });
    } else {
      User.findByIdAndUpdate(
        { _id: req.user._id },
        { $addToSet: { liked_trips: tripId } },
        { new: true }
      ).then(res => {
        console.log(res);
      });
    }
  });
});

module.exports = router;
