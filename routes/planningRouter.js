const { createPlanning, getAllPlannings, deletePlanning, updatePlanning } = require("../controllers/PlaninngController")

const router =require("express").Router()

router.route("/").post(createPlanning)
                .get(getAllPlannings)
router.route("/:id").delete(deletePlanning)
                    .put(updatePlanning)
module.exports=router