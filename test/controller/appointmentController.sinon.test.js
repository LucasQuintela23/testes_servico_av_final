
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import { appointmentService } from '../../service/appointmentService.js';
import appointmentController from '../../controller/appointmentController.js';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
const respostas = JSON.parse(fs.readFileSync(path.resolve('test/fixture/respostas/appointment.json')));
let app;
describe('AppointmentController com Sinon', () => {
  afterEach(() => sinon.restore());

  beforeEach(() => {
    sinon.restore();
  app = express();
  app.use(express.json());
  app.use('/appointments', appointmentController);
  // ...existing code...

  // Gera um token JWT válido para os testes
  const SECRET = 'supersecretkey';
  function getToken() {
    return jwt.sign({ user: 'test' }, SECRET);
  }

  it('deve retornar sucesso ao agendar consulta', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(respostas.createSuccess.body);
    const res = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00Z' });
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Appointment scheduled.');
  });

  it('deve retornar erro 400 se horário ocupado', async () => {
    sinon.stub(appointmentService, 'scheduleAppointment').returns(respostas.createFail.body);
    const res = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${getToken()}`)
      .send({ cpf: '123', datetime: '2025-09-22T10:00:00Z' });
    expect(res.statusCode).to.equal(409);
    expect(res.body.message).to.equal('Datetime already booked.');
  });

  it('deve retornar lista ao listar consultas', async () => {
    sinon.stub(appointmentService, 'listAppointments').returns([{ cpf: '123', datetime: '2025-09-22T10:00:00' }]);
    const res = await request(app)
      .get('/appointments')
      .set('Authorization', `Bearer ${getToken()}`);
    expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
  });
    });
  });
