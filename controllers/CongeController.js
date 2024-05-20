const Conge = require('../models/Conge');
const asyncHandler = require('express-async-handler');
const Employe = require('../models/Employe');

exports.createConge = asyncHandler(async (req, res) => {
    const { id_employe, date_debut, date_fin } = req.body;

    // Vérifier si tous les champs requis sont présents
    if (!id_employe || !date_debut || !date_fin) {
        return res.status(400).json({ error: 'Tous les champs sont requis pour créer un congé' });
    }

    try {
        // Vérifier si l'employé existe
        const employe = await Employe.findByPk(id_employe);
        if (!employe) {
            return res.status(404).json({ error: 'Employé non trouvé verifier code client' });
        }

        const conge = await Conge.create({
            id_employe,
            date_debut,
            date_fin
        });
        res.status(201).json(conge);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du congé' });
    }
});
exports.getAllConges = asyncHandler(async (req, res) => {
 
        const conges = await Conge.findAll();

        if (conges.length === 0) {
            return res.status(404).json({ message: 'Aucun congé trouvé' });
        }
        res.status(200).json(conges);

});
exports.getCongeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    
        const conge = await Conge.findByPk(id, {
            include: {
                model: Employe,
            }
        });

        if (!conge) {
            return res.status(404).json({ error: 'Congé non trouvé' });
        }

        res.status(200).json(conge);

});

exports.updateConge = asyncHandler(async (req, res) => {
    const { id } = req.params;

   
        let conge = await Conge.findByPk(id);

        if (!conge) {
            return res.status(404).json({ error: 'Congé non trouvé' });
        }

        conge = await conge.update(req.body);

        res.status(200).json(conge);
   
});

exports.deleteConge = asyncHandler(async (req, res) => {
    const { id } = req.params;

  
        const deleted = await Conge.destroy({
            where: { id }
        });

        if (deleted) {
            res.status(200).json({message:"deleted successfully"});
        } else {
            res.status(404).json({ error: 'Congé non trouvé' });
        }
    
});
