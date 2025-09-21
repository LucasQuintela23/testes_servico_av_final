// patientService.js
const { patients } = require('../model/patientModel');

function registerPatient(patient) {
  if (patients.find(p => p.cpf === patient.cpf)) {
    return false;
  }
  patients.push(patient);
  return true;
}

function listPatients() {
  return patients;
}

module.exports = { registerPatient, listPatients };