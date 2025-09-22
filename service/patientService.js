// patientService.js
import { patients } from '../model/patientModel.js';

export const patientService = {
  registerPatient(patient) {
    if (!patient.cpf || !patient.name) {
      return { error: 'invalid_data' };
    }
    if (patients.find(p => p.cpf === patient.cpf)) {
      return false;
    }
    patients.push(patient);
    return { id: patients.length, ...patient };
  },
  listPatients() {
    return patients;
  }
};