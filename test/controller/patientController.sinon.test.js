import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { patientService } from '../../service/patientService.js';
import patientController from '../../controller/patientController.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

const respostas = JSON.parse(fs.readFileSync(path.resolve('test/fixture/respostas/patient.json')));

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
    sinon.stub(patientService, 'registerPatient').returns(respostas.createSuccess.body);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(respostas.createSuccess.status);
    expect(res.body).to.deep.include(respostas.createSuccess.body);
  });

  it('deve retornar erro 400 se paciente já existe', async () => {
    sinon.stub(patientService, 'registerPatient').returns(respostas.createFail.body);
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(respostas.createFail.status);
    expect(res.body).to.deep.include(respostas.createFail.body);
  });

  it('deve retornar lista ao listar pacientes', async () => {
  sinon.stub(patientService, 'listPatients').returns([{ cpf: '123', name: 'Paciente' }]);
    const res = await request(app)
      .get('/patients');
  expect(res.statusCode).to.equal(200);
  expect(res.body).to.be.an('array');
  });
});
