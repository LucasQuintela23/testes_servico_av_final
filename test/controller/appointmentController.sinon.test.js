import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { appointmentService } from '../../service/appointmentService.js';
import appointmentController from '../../controller/appointmentController.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

const respostas = JSON.parse(fs.readFileSync(path.resolve('test/fixture/respostas/appointment.json')));

let app;
describe('AppointmentController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
  app = express();
  app.use(express.json());
  app.use('/appointments', appointmentController);
  });

  it('deve retornar sucesso ao agendar consulta', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(respostas.createSuccess.body);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00Z' });
    expect(res.statusCode).to.equal(respostas.createSuccess.status);
    expect(res.body).to.deep.include(respostas.createSuccess.body);
  });

  it('deve retornar erro 400 se horário ocupado', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(respostas.createFail.body);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00Z' });
    expect(res.statusCode).to.equal(respostas.createFail.status);
    expect(res.body).to.deep.include(respostas.createFail.body);
  });

  it('deve retornar lista ao listar consultas', async () => {
  sinon.stub(appointmentService, 'listAppointments').returns([{ cpf: '123', datetime: '2025-09-22T10:00:00' }]);
    const res = await request(app)
      .get('/appointments');
  expect(res.statusCode).to.equal(200);
  expect(res.body).to.be.an('array');
  });
});
