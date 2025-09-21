const sinon = require('sinon');
const request = require('supertest');
const express = require('express');
const appointmentService = require('../../service/appointmentService');

let app;
describe('AppointmentController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
    app = express();
    app.use(express.json());
    const appointmentController = require('../../controller/appointmentController');
    app.use('/appointments', appointmentController);
  });

  it('deve retornar sucesso ao agendar consulta', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(true);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Appointment scheduled.');
  });

  it('deve retornar erro 409 se horário ocupado', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(false);
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00' });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Datetime already booked.');
  });

  it('deve retornar lista ao listar consultas', async () => {
    sinon.stub(appointmentService, 'listAppointments').returns([{ cpf: '123', datetime: '2025-09-22T10:00:00' }]);
    const res = await request(app)
      .get('/appointments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
