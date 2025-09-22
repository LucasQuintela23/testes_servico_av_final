import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { patientService } from '../../service/patientService.js';
import patientController from '../../controller/patientController.js';
import { expect } from 'chai';

let app;
describe('PatientController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
  app = express();
  app.use(express.json());
  app.use('/patients', patientController);
  });

  it('deve retornar sucesso ao registrar paciente', async () => {
  sinon.stub(patientService, 'registerPatient').returns(true);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '123', name: 'Paciente' });
  expect(res.statusCode).to.equal(201);
  expect(res.body.message).to.equal('Patient registered.');
  });

  it('deve retornar erro 409 se paciente já existe', async () => {
  sinon.stub(patientService, 'registerPatient').returns(false);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '123', name: 'Paciente' });
  expect(res.statusCode).to.equal(409);
  expect(res.body.message).to.equal('Patient already registered.');
  });

  it('deve retornar lista ao listar pacientes', async () => {
  sinon.stub(patientService, 'listPatients').returns([{ cpf: '123', name: 'Paciente' }]);
    const res = await request(app)
      .get('/patients');
  expect(res.statusCode).to.equal(200);
  expect(res.body).to.be.an('array');
  });
});
