import { expect } from 'chai';
import request from 'supertest';

const baseUrl = 'http://localhost:3000';

describe('AppointmentController - Testes Externos', () => {
  it('deve agendar uma consulta', async () => {
    const res = await request(baseUrl)
      .post('/appointments')
      .send({ cpf: '12345678900', datetime: '2025-09-22T10:00:00' });
    expect(res.statusCode).to.equal(201);
    expect(res.body.message).to.equal('Appointment scheduled.');
  });

  it('não deve agendar em horário ocupado', async () => {
    await request(baseUrl)
      .post('/appointments')
      .send({ cpf: '12345678900', datetime: '2025-09-22T10:00:00' });
    const res = await request(baseUrl)
      .post('/appointments')
      .send({ cpf: '12345678900', datetime: '2025-09-22T10:00:00' });
    expect(res.statusCode).to.equal(409);
    expect(res.body.message).to.equal('Datetime already booked.');
  });

  it('deve listar consultas', async () => {
    const res = await request(baseUrl)
      .get('/appointments');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
