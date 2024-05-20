const asyncHandler = require('express-async-handler');
const Planning = require('../models/Planning');
const moment = require('moment');

// Créer un nouveau planning
exports.createPlanning = asyncHandler(async (req, res) => {
    const { id_employe, jour, service, site, activite } = req.body;

    if (!id_employe || !jour || !service || !site || !activite) {
        return res.status(400).json({ error: 'Tous les champs sont requis pour créer un planning' });
    }

    const jourEnMinuscules = jour.toLowerCase();
    const joursValides = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    if (!joursValides.includes(jourEnMinuscules)) {
        return res.status(400).json({ error: 'Le jour spécifié n\'est pas valide' });
    }

    try {
        const planning = await Planning.create({
            id_employe,
            jour,
            service,
            site,
            activite
        });
        res.status(201).json(planning);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du planning' });
    }
});



// Récupérer tous les plannings
exports.getAllPlannings = asyncHandler(async (req, res) => {
    try {
        const plannings = await Planning.findAll();
        res.status(200).json(plannings);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des plannings' });
    }
});

// Récupérer un planning par son ID
exports.getPlanningById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const planning = await Planning.findByPk(id);
        if (!planning) {
            return res.status(404).json({ error: 'Planning non trouvé' });
        }
        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du planning' });
    }
});

// Mettre à jour un planning
exports.updatePlanning = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id_employe, jour, service, site, activite } = req.body;

    try {
        const planning = await Planning.findByPk(id);
        if (!planning) {
            return res.status(404).json({ error: 'Planning non trouvé' });
        }

        await planning.update({
            id_employe,
            jour,
            service,
            site,
            activite
        });

        res.status(200).json(planning);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du planning' });
    }
});

// Supprimer un planning
exports.deletePlanning = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Planning.destroy({
            where: { id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Planning non trouvé' });
        }
        res.status(200).json({ message: 'Planning supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du planning' });
    }
});
