import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { patientService } from '../../service/patientService.js';
import patientController from '../../controller/patientController.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

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

  // Gera um token JWT válido para os testes
  const SECRET = 'supersecretkey';
  function getToken() {
    return jwt.sign({ user: 'test' }, SECRET);
  }

  it('deve retornar sucesso ao registrar paciente', async () => {
    sinon.stub(patientService, 'registerPatient').returns(respostas.createSuccess.body);
    const res = await request(app)
      .post('/patients')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Patient registered.');
  });

  it('deve retornar erro 400 se paciente já existe', async () => {
    sinon.stub(patientService, 'registerPatient').returns(respostas.createFail.body);
    const res = await request(app)
      .post('/patients')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).to.equal(409);
    expect(res.body.message).to.equal('Patient already registered.');
  });

  it('deve retornar lista ao listar pacientes', async () => {
    sinon.stub(patientService, 'listPatients').returns([{ cpf: '123', name: 'Paciente' }]);
    const res = await request(app)
      .get('/patients')
      .set('Authorization', `Bearer ${getToken()}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
