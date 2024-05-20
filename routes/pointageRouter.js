const express = require('express');
const router = express.Router();
const { createPointage, getAllPointages, updatePointage, updateNbreHeuresSuppli } = require('../controllers/pointageController');

// Create a Pointage
router.route("/").post(createPointage)
.get( getAllPointages);
router.route("/heuresSupp").put(updateNbreHeuresSuppli);
router.route("/:id").put(updatePointage);
module.exports = router;
