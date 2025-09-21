// patientController.js
const express = require('express');
const router = express.Router();
const { registerPatient, listPatients } = require('../service/patientService');

router.post('/', (req, res) => {
  const patient = req.body;
  if (!patient.cpf || !patient.name) {
    return res.status(400).json({ message: 'CPF and name required.' });
  }
  if (!registerPatient(patient)) {
    return res.status(409).json({ message: 'Patient already registered.' });
  }
  return res.status(201).json({ message: 'Patient registered.' });
});

router.get('/', (req, res) => {
  return res.json(listPatients());
});

module.exports = router;
