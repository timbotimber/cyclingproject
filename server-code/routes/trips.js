const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');

router.post('/addTrip', (req, res, next) => {
  const { uuid, duration, distance, coordinates } = req.body;
  Trip.create({ uuid, duration, distance, coordinates }).then(postTrip => {
    res.json(postTrip);
  });
  console.log(req.body);
});
module.exports = router;
