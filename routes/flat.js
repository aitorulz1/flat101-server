const express = require("express");
const router = express.Router();
const flatsController = require("../controllers/flatController");
const auth = require("../middleware/auth");

router.post("/", flatsController.createFlat);
router.get("/", flatsController.getAllFlats);
router.get("/:type", flatsController.findTypes);
router.get("/types", flatsController.getTypes);

module.exports = router;
