// patientController.js

import express from 'express';
import { patientService } from '../service/patientService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
  const patient = req.body;
  if (!patient.cpf || !patient.name) {
    return res.status(400).json({ message: 'CPF and name required.' });
  }
  const result = patientService.registerPatient(patient);
  if (result && result.id) {
    return res.status(201).json({ message: 'Patient registered.' });
  }
  if (result && result.error === 'invalid_data') {
    return res.status(400).json({ message: 'CPF and name required.' });
  }
  return res.status(409).json({ message: 'Patient already registered.' });
});

router.get('/', authenticateToken, (req, res) => {
  return res.json(patientService.listPatients());
});

export default router;
