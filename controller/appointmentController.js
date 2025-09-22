// appointmentController.js
import express from 'express';
import { appointmentService } from '../service/appointmentService.js';
const router = express.Router();

router.post('/', (req, res) => {
  const { cpf, datetime } = req.body;
  if (!cpf || !datetime) {
    return res.status(400).json({ message: 'CPF and datetime required.' });
  }
  if (!appointmentService.scheduleAppointment({ cpf, datetime })) {
    return res.status(409).json({ message: 'Datetime already booked.' });
  }
  return res.status(201).json({ message: 'Appointment scheduled.' });
});

router.get('/', (req, res) => {
  return res.json(appointmentService.listAppointments());
});

export default router;
