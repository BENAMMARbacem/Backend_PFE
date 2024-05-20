const express = require('express');
const router = express.Router();
const {
    createRepo,
    getAllRepos,
    getRepoByCode,
    updateRepo,
    deleteRepo
} = require('../controllers/ReposController');

// Routes CRUD pour les repos
router.route("/").post(createRepo)
                .get( getAllRepos); 
router.route("/:code")
        .get(getRepoByCode)
        .put(updateRepo)
        .delete(deleteRepo); 

module.exports = router;
