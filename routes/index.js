/* We'll centralize our routes imports to this file to keep our code clean */

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("This is home");
});

const usersRoutes = require("./users");
router.use("/api/auth", usersRoutes);

const tripRoutes = require("./trips");
router.use("/api/trips", tripRoutes);

module.exports = router;
