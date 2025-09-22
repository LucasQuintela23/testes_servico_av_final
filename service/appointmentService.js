// appointmentService.js
import { appointments } from '../model/appointmentModel.js';

export const appointmentService = {
  scheduleAppointment({ cpf, datetime }) {
    if (!cpf || !datetime) {
      return { error: 'invalid_data' };
    }
    if (appointments.find(a => a.datetime === datetime)) {
      return false;
    }
    appointments.push({ cpf, datetime });
    return { id: appointments.length, cpf, datetime };
  },
  listAppointments() {
    return appointments;
  }
};