const express = require('express');
const router = express.Router();
const { createFormuleMonsionel, getAllFormulesMonsionel } = require('../controllers/FormuleController');

// Route pour créer une nouvelle formule Monsionel
router.route("/").post(createFormuleMonsionel)
.get(getAllFormulesMonsionel);

module.exports = router;