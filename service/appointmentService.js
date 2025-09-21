// appointmentService.js
const { appointments } = require('../model/appointmentModel');

function scheduleAppointment({ cpf, datetime }) {
  if (appointments.find(a => a.datetime === datetime)) {
    return false;
  }
  appointments.push({ cpf, datetime });
  return true;
}

function listAppointments() {
  return appointments;
}

module.exports = { scheduleAppointment, listAppointments };