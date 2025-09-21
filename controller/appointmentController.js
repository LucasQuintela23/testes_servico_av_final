// appointmentController.js
const express = require('express');
const router = express.Router();
const { scheduleAppointment, listAppointments } = require('../service/appointmentService');

router.post('/', (req, res) => {
  const { cpf, datetime } = req.body;
  if (!cpf || !datetime) {
    return res.status(400).json({ message: 'CPF and datetime required.' });
  }
  if (!scheduleAppointment({ cpf, datetime })) {
    return res.status(409).json({ message: 'Datetime already booked.' });
  }
  return res.status(201).json({ message: 'Appointment scheduled.' });
});

router.get('/', (req, res) => {
  return res.json(listAppointments());
});

module.exports = router;
