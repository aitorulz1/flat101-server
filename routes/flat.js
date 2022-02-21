const express = require("express");
const router = express.Router();
const flatsController = require("../controllers/flatController");

router.post("/", flatsController.createFlat);
router.get("/", flatsController.getAllFlats);

module.exports = router;
