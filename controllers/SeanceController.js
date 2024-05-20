const Seance = require('../models/Seance');
const asyncHandler = require('express-async-handler');

// Create a new Seance
exports.createSeance = asyncHandler(async (req, res) => {
    const { type_seance } = req.body;
  
    // Validate type_seance
    if (!type_seance || !['double_seance', 'seance_unique', 'ramadan'].includes(type_seance)) {
        return res.status(400).json({ message: 'Invalid or missing type_seance' });
    }

    // Check if type_seance already exists
    const existingSeance = await Seance.findOne({ where: { type_seance } });
    if (existingSeance) {
        return res.status(409).json({ message: 'type_seance already exists' });
    }

    const seance = await Seance.create(req.body);
    res.status(201).json(seance);
});
// Get all Seances
exports.getAllSeances = asyncHandler(async (req, res) => {
    const seances = await Seance.findAll();
    res.status(200).json(seances);
  });
  

