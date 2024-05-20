const asyncHandler = require('express-async-handler');
const Repos = require('../models/Repos');

// Créer un nouveau repo
exports.createRepo = asyncHandler(async (req, res) => {
    const { code, designation, couleur } = req.body;

    try {
        // Vérifier si le repo avec le même code existe déjà
        const existingRepo = await Repos.findOne({ where: { code } });
        if (existingRepo) {
            return res.status(409).json({ error: 'Un repo avec ce code existe déjà' });
        }

        // Si le repo n'existe pas, créer un nouveau repo
        const repo = await Repos.create({
            code,
            designation,
            couleur
        });
        res.status(201).json(repo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du repo' });
    }
});


// Récupérer tous les repos
exports.getAllRepos = asyncHandler(async (req, res) => {
    try {
        const repos = await Repos.findAll();
        res.status(200).json(repos);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des repos' });
    }
});

// Récupérer un repo par son code
exports.getRepoByCode = asyncHandler(async (req, res) => {
    const { code } = req.params;

    try {
        const repo = await Repos.findOne({
            where: { code }
        });
        if (!repo) {
            return res.status(404).json({ error: 'Repo non trouvé' });
        }
        res.status(200).json(repo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du repo' });
    }
});

// Mettre à jour un repo
exports.updateRepo = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const { designation, couleur } = req.body;

    try {
        const repo = await Repos.findOne({
            where: { code }
        });
        if (!repo) {
            return res.status(404).json({ error: 'Repo non trouvé' });
        }

        await repo.update({
            designation,
            couleur
        });

        res.status(200).json(repo);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du repo' });
    }
});

// Supprimer un repo
exports.deleteRepo = asyncHandler(async (req, res) => {
    const { code } = req.params;

    try {
        const deleted = await Repos.destroy({
            where: { code }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Repo non trouvé' });
        }
        res.status(200).json({ message: 'Repo supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du repo' });
    }
});
