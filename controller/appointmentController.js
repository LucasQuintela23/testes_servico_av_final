// appointmentController.js

import express from 'express';
import { appointmentService } from '../service/appointmentService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
  const { cpf, datetime } = req.body;
  if (!cpf || !datetime) {
    return res.status(400).json({ message: 'CPF and datetime required.' });
  }
  const result = appointmentService.scheduleAppointment({ cpf, datetime });
  if (result && result.id) {
    return res.status(201).json({ message: 'Appointment scheduled.' });
  }
  if (result && result.error === 'invalid_data') {
    return res.status(400).json({ message: 'CPF and datetime required.' });
  }
  return res.status(409).json({ message: 'Datetime already booked.' });
});

router.get('/', authenticateToken, (req, res) => {
  return res.json(appointmentService.listAppointments());
});

export default router;
