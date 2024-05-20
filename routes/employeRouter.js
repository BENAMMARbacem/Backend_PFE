const express = require('express');
const { createEmploye, updateEmploye, getEmployeById, deleteEmploye, getAllUserEmployes } = require('../controllers/employeController');
const router = express.Router();

router.route("/").post( createEmploye);
router.route('/:id').put(updateEmploye);
router.route("/").get(getAllUserEmployes);
router.route('/:id').get(getEmployeById);
router.route('/:id').delete( deleteEmploye);

module.exports=router;