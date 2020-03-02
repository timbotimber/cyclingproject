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
    destination_name
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
    destination_name
  }).then(postTrip => {
    res.json(postTrip);
  });
  console.log(req.body);
});
module.exports = router;
