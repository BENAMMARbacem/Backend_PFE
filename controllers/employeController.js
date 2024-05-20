
const Employe = require('../models/Employe');
const asyncHandler = require('express-async-handler')


// Create
exports.createEmploye = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const existingEmploye = await Employe.findOne({ where: { code } });

    if (existingEmploye) {
        return res.status(409).json({ error: 'Employe already exists' });
    }
    const employeData = {
      ...req.body,
      role:  'user' 
  };

    const employe = await Employe.create(employeData);
    res.status(201).json(employe);
});

// Update
exports.updateEmploye = asyncHandler(async (req, res) => {
    const [updated] = await Employe.update(req.body, {
      where: { code: req.params.id }
    });
    if (updated) {
      const updatedEmploye = await Employe.findByPk(req.params.id);
      res.status(200).json(updatedEmploye);
    } else {
      res.status(404).json({ error: 'Employe not found' });
    }
  });

  // Read One
exports.getEmployeById = asyncHandler(async (req, res) => {
    const employe = await Employe.findByPk(req.params.id);
    if (employe) {
      res.status(200).json(employe);
    } else {
      res.status(404).json({ error: 'Employe not found' });
    }
  });

  // Read All
// Read All Employes with role 'user'
exports.getAllUserEmployes = asyncHandler(async (req, res) => {
  const employes = await Employe.findAll({
    where: {
      role: 'user'
    }
  });
  if (employes.length === 0) {
    return res.status(404).json({ message: "No user employe found!" });
  }
  res.status(200).json(employes);
});

  // Delete
exports.deleteEmploye = asyncHandler(async (req, res) => {
    const deleted = await Employe.destroy({
      where: { code: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Employe deleted' });
    } else {
      res.status(404).json({ error: 'Employe not found' });
    }
  });