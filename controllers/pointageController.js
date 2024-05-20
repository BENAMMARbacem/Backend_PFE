const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Pointage = require('../models/Pointage');
const Employe = require('../models/Employe');
// Create Pointage
exports.createPointage = asyncHandler(async (req, res) => {
    const { id_emploi, date, entre, sortie, pause_de, pause_a, nbre_heures_Suppli } = req.body;

    // Valider la présence des champs requis
    if (!id_emploi || !date || !entre || !sortie || !pause_de || !pause_a) {
        return res.status(400).json({ error: 'Tous les champs sauf nbre_heures_Suppli sont requis' });
    }

    // Vérifier si l'employé existe
    const employe = await Employe.findByPk(id_emploi);
    if (!employe) {
        return res.status(404).json({ error: 'Employé non trouvé' });
    }

    // Définir nbre_heures_Suppli à 0 s'il n'est pas fourni
    const nbre_heures_SuppliValue = nbre_heures_Suppli || 0;

    try {
        const pointage = await Pointage.create({
            id_emploi,
            date,
            entre,
            sortie,
            pause_de,
            pause_a,
            nbre_heures_Suppli: nbre_heures_SuppliValue
        });

        res.status(201).json(pointage);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du pointage' });
    }
});
//get all pointage


exports.getAllPointages = asyncHandler(async (req, res) => {
    const pointages = await Pointage.findAll({
        include: { model: Employe }
    });

    // Calculer le nombre d'heures travaillées pour chaque pointage
    const pointagesWithHours = pointages.map(pointage => {
        const entre = moment(pointage.entre, 'HH:mm');
        const sortie = moment(pointage.sortie, 'HH:mm');
        const pauseDe = moment(pointage.pause_de, 'HH:mm');
        const pauseA = moment(pointage.pause_a, 'HH:mm');

        // Calculer la durée de travail en soustrayant la sortie de l'entrée, moins la durée de la pause
        const dureeTravail = sortie.diff(entre, 'hours') - pauseA.diff(pauseDe, 'hours');

        // Ajouter la durée de travail au pointage
        return { ...pointage.toJSON(), dureeTravail };
    });

    res.status(200).json(pointagesWithHours);
});

//update pointage
exports.updatePointage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    
        let pointage = await Pointage.findByPk(id);

        if (!pointage) {
            return res.status(404).json({ error: 'Pointage not found' });
        }

        pointage = await pointage.update(req.body);

        res.status(200).json(pointage);

});

exports.updateNbreHeuresSuppli = asyncHandler(async (req, res) => {
    const { id_emploi, date, nbre_heures_Suppli } = req.body;

    if (!id_emploi || !date || nbre_heures_Suppli === undefined) {
        return res.status(400).json({ error: 'Les champs id_emploi, date et nbre_heures_Suppli sont requis' });
    }

    try {
        const pointage = await Pointage.findOne({ where: { id_emploi, date } });

        if (!pointage) {
            return res.status(404).json({ error: 'Pointage non trouvé pour cet employé à cette date' });
        }

        pointage.nbre_heures_Suppli = nbre_heures_Suppli;
        await pointage.save();

        res.status(200).json(pointage);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du pointage' });
    }
});