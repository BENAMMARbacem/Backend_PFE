const router=require("express").Router()
const getEmployeeStatistics = require("../controllers/TableauBord")



router.route("/:idEmploye").get(getEmployeeStatistics)

module.exports=router