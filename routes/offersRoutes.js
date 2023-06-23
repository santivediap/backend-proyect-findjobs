const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offersControllers");

// Offers routes
router.get("/dashboard", offerController.getOffers);
router.post("/offers", offerController.createOffer);
router.put("/offers/:title", offerController.updateOffer);
router.delete("/offers/:id", offerController.deleteOffer);

module.exports = router;
