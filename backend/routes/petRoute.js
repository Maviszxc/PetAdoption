const express = require("express");
const router = express.Router();

const petController = require("../controllers/petController");

router.get("/", petController.pets);
router.get("/breed/:breed", petController.petsByBreed);
router.post("/create", petController.createPet);

module.exports = router;
