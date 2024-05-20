// controllers/pointeuseController.js
const Pointeuse = require('../models/Pointeuse');
const asyncHandler = require('express-async-handler');
//create new pointesue
exports.createPointeuse = asyncHandler(async (req, res) => {
    const { codePointeuse } = req.body;
  
    // Check if the pointeuse already exists
    const existingPointeuse = await Pointeuse.findOne({ where: { codePointeuse } });
  
    if (existingPointeuse) {
      // If pointeuse already exists, return a 409 Conflict status
      return res.status(409).json({ error: 'Pointeuse already exists' });
    }
  
    // If pointeuse doesn't exist, create it
    const pointeuse = await Pointeuse.create(req.body);
    res.status(201).json(pointeuse);
  });

// Read All
exports.getAllPointeuses = asyncHandler(async (req, res) => {
  const pointeuses = await Pointeuse.findAll();
  if (pointeuses.length === 0) {
    return res.status(404).json({ message: "No pointeuse found!" });
  }
  res.status(200).json(pointeuses);
});
//custome search with code and libelle
exports.searchPointeuses = asyncHandler(async (req, res) => {
    const { code, libelle } = req.query;
    console.log(code,libelle)
    let query = {};
  
    // Build the query object based on provided parameters
    if (code) {
      query.codePointeuse = code;
    }
    if (libelle) {
      query.libelle = libelle;
    }
  
    // Find pointeuses matching the query
    const pointeuses = await Pointeuse.findAll({ where: query });
  
    if (pointeuses.length === 0) {
      return res.status(404).json({ message: "No pointeuse found!" });
    }
  
    res.status(200).json(pointeuses);
  });


// Read One
exports.getPointeuseById = asyncHandler(async (req, res) => {
  const pointeuse = await Pointeuse.findByPk(req.params.id);
  if (pointeuse) {
    res.status(200).json(pointeuse);
  } else {
    res.status(404).json({ error: 'Pointeuse not found' });
  }
});

// Update
exports.updatePointeuse = asyncHandler(async (req, res) => {
  const [updated] = await Pointeuse.update(req.body, {
    where: { codePointeuse: req.params.id }
  });
  if (updated) {
    const updatedPointeuse = await Pointeuse.findByPk(req.params.id);
    res.status(200).json(updatedPointeuse);
  } else {
    res.status(404).json({ error: 'Pointeuse not found' });
  }
});

// Delete
exports.deletePointeuse = asyncHandler(async (req, res) => {
    try {
      const deleted = await Pointeuse.destroy({
        where: { codePointeuse: req.params.id }
      });
      console.log(deleted);
      if (deleted === 1) {
       return res.status(200).json({ message: 'Pointeuse deleted' });
      } else {
        res.status(404).json({ error: 'Pointeuse not found' });
      }
    } catch (error) {
      console.error('Error deleting pointeuse:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
