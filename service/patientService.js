// patientService.js
import { patients } from '../model/patientModel.js';

export const patientService = {
  registerPatient(patient) {
    if (patients.find(p => p.cpf === patient.cpf)) {
      return false;
    }
    patients.push(patient);
    return true;
  },
  listPatients() {
    return patients;
  }
};