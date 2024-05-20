const express = require('express');
const { createPointeuse, getAllPointeuses, getPointeuseById, updatePointeuse, deletePointeuse, searchPointeuses } = require('../controllers/pointeuseController');
const router = express.Router();

router.route("/").post( createPointeuse);
router.route("/").get(getAllPointeuses);
router.route("/search").get(searchPointeuses);
router.route('/:id').get(getPointeuseById);
router.route('/:id').put(updatePointeuse);
router.route('/:id').delete( deletePointeuse);
module.exports = router;