const express = require("express");
const tourController = require("../controllers/tourControllers");
const router = express.Router();

router
  .route("/top-5-cheap")
  .get(tourController.cheapFiveTours, tourController.getAllTours);
router
  .route("/")
  .post(tourController.createTour)
  .get(tourController.getAllTours);

module.exports = router;
