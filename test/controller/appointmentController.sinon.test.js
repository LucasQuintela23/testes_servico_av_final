import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { appointmentService } from '../../service/appointmentService.js';
import appointmentController from '../../controller/appointmentController.js';
import { expect } from 'chai';

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
  sinon.stub(appointmentService, 'scheduleAppointment').returns(true);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00' });
  expect(res.statusCode).to.equal(201);
  expect(res.body.message).to.equal('Appointment scheduled.');
  });

  it('deve retornar erro 409 se horário ocupado', async () => {
  sinon.stub(appointmentService, 'scheduleAppointment').returns(false);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00' });
  expect(res.statusCode).to.equal(409);
  expect(res.body.message).to.equal('Datetime already booked.');
  });

  it('deve retornar lista ao listar consultas', async () => {
  sinon.stub(appointmentService, 'listAppointments').returns([{ cpf: '123', datetime: '2025-09-22T10:00:00' }]);
    const res = await request(app)
      .get('/appointments');
  expect(res.statusCode).to.equal(200);
  expect(res.body).to.be.an('array');
  });
});
