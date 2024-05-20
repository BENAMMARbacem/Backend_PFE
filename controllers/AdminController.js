const Employe = require('../models/Employe');
const asyncHandler = require('express-async-handler')


// Create a new admin
exports.CreateAdmin = asyncHandler(async (req, res) => {
    const { code, role } = req.body;

    if (!code ) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const employe = await Employe.findByPk(code);

    if (!employe) {
        return res.status(404).json({ error: 'Employe not found' });
    }

    employe.role = "admin";

    await employe.save();

    res.status(200).json(employe);
});




// Read All Employes with role 'admin'
exports.getAllAdminEmployes = asyncHandler(async (req, res) => {
    const employes = await Employe.findAll({
      where: {
        role: 'admin'
      }
    });
    if (employes.length === 0) {
      return res.status(404).json({ message: "No admin employe found!" });
    }
    res.status(200).json(employes);
  });
  