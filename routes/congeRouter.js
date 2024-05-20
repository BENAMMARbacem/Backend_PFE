const express = require('express');
const { createConge, getAllConges, updateConge, deleteConge, getCongeById } = require('../controllers/CongeController');
const router = express.Router();

router.route("/")
    .post(createConge)
    .get(getAllConges);

router.route('/:id')
    .get(getCongeById)
    .put(updateConge)
    .delete(deleteConge);

module.exports = router;
