// routes/seance.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { createSeance, getAllSeances } = require('../controllers/SeanceController');

router.route("/").post(createSeance)
                    .get(getAllSeances);


module.exports = router;
