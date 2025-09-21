const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const patientService = require('../../service/patientService');

let app;
describe('PatientController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
    app = express();
    app.use(express.json());
    const patientController = require('../../controller/patientController');
    app.use('/patients', patientController);
  });

  it('deve retornar sucesso ao registrar paciente', async () => {
    sinon.stub(patientService, 'registerPatient').returns(true);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '123', name: 'Paciente' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Patient registered.');
  });

  it('deve retornar erro 409 se paciente já existe', async () => {
    sinon.stub(patientService, 'registerPatient').returns(false);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '123', name: 'Paciente' });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Patient already registered.');
  });

  it('deve retornar lista ao listar pacientes', async () => {
    sinon.stub(patientService, 'listPatients').returns([{ cpf: '123', name: 'Paciente' }]);
    const res = await request(app)
      .get('/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
