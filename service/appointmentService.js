// appointmentService.js
import { appointments } from '../model/appointmentModel.js';

export const appointmentService = {
  scheduleAppointment({ cpf, datetime }) {
    if (appointments.find(a => a.datetime === datetime)) {
      return false;
    }
    appointments.push({ cpf, datetime });
    return true;
  },
  listAppointments() {
    return appointments;
  }
};