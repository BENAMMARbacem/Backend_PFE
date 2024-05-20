const express = require('express');
const { getAllAdminEmployes, CreateAdmin } = require('../controllers/AdminController');
const { deleteEmploye } = require('../controllers/employeController');
const router = express.Router();

router.route("/").get( getAllAdminEmployes)
                .post((CreateAdmin))
router.route('/:id').delete( deleteEmploye);
// router.route('/:id').put(updateEmploye);
// router.route("/").get(getAllUserEmployes);
// router.route('/:id').get(getEmployeById);
// router.route('/:id').delete( deleteEmploye);
module.exports=router;