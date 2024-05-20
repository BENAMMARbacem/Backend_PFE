const asyncHandler = require('express-async-handler');
const Pointage = require('../models/Pointage');
const Conge = require('../models/Conge');

const getEmployeeStatistics = asyncHandler(async (req, res) => {
  const { idEmploye } = req.params;
  try {
    // Step 1: Retrieve all attendance records for the employee
    const pointageRecords = await Pointage.findAll({
      where: { id_emploi: idEmploye },
      order: [['date', 'ASC']],
    });
    // Step 2: Calculate number of absences and tardies
    let nbreAbsences = 0;
    let nbreRetards = 0;
    let nbreHeuresSupp = 0;

    if (pointageRecords.length > 0) {
      const firstPointageDate = new Date(pointageRecords[0].entre);
      const lastPointageDate = new Date(pointageRecords[pointageRecords.length - 1].sortie);
    
      const minDate = new Date(firstPointageDate);
      minDate.setDate(minDate.getDate() + 1); // Exclude the first date
    
      const maxDate = new Date(lastPointageDate);
    
      // Check for absences and tardies
      let currentDate = new Date(minDate);
      while (currentDate <= maxDate) {
        const currentDateStr = currentDate.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
        const hasAttendance = pointageRecords.some(record => record.date === currentDateStr);
        if (!hasAttendance) {
          nbreAbsences++;
        } else {
          const currentRecord = pointageRecords.find(record => record.date === currentDateStr);
          if (currentRecord.entre > '08:00:00') {
            nbreRetards++;
          }
          nbreHeuresSupp += parseInt(currentRecord.nbre_heures_Suppli || 0); // Parse nbre_heures_Suppli to an integer or default to 0
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    }
    

    // Step 3: Fetch number of leaves for the employee
    const congeRecords = await Conge.findAll({
      where: { id_employe: idEmploye }
    });
    const nbreConges = congeRecords.length;

    // Step 4: Return statistics
    res.status(200).json({
      idEmploye,
      nbreAbsences,
      nbreRetards,
      nbreHeuresSupp,
      nbreConges
    });
  } catch (error) {
    res.status(500).json({ error: `Error fetching employee statistics: ${error.message}` });
  }
});

module.exports = getEmployeeStatistics;
