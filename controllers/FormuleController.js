const asyncHandler = require('express-async-handler');
const FormuleMonsionel = require('../models/FormuleMonsionel');
// Créer une formule Monsionel
exports.createFormuleMonsionel = asyncHandler(async (req, res) => {
    const { nbre_heures_max, nbre_heures_min, heure_supp } = req.body;

    // Vérifier si des données sont manquantes
    if (!nbre_heures_max || !nbre_heures_min || !heure_supp) {
        return res.status(400).json({ error: 'Données manquantes. Assurez-vous de fournir toutes les valeurs nécessaires.' });
    }

    // Créer la formule
    try {
        const formule = await FormuleMonsionel.create({
            nbre_heures_max,
            nbre_heures_min,
            heure_supp
        });
        res.status(201).json(formule);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la formule Monsionel' });
    }
});

// Récupérer toutes les formules Monsionel
exports.getAllFormulesMonsionel = asyncHandler(async (req, res) => {
    try {
        const formules = await FormuleMonsionel.findAll();
        res.status(200).json(formules);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des formules Monsionel' });
    }
});