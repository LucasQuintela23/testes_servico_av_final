const request = require('supertest');
const app = require('../../app');

describe('AppointmentController', () => {
  it('deve agendar consulta em horário livre', async () => {
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '12345678900', datetime: '2025-09-22T10:00:00' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Appointment scheduled.');
  });

  it('deve impedir agendamento em horário ocupado', async () => {
    await request(app)
      .post('/appointments')
      .send({ cpf: '12345678901', datetime: '2025-09-22T11:00:00' });
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '12345678902', datetime: '2025-09-22T11:00:00' });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Datetime already booked.');
  });

  it('deve falhar sem CPF ou datetime', async () => {
    const res = await request(app)
      .post('/appointments')
      .send({ cpf: '12345678903' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('CPF and datetime required.');
  });

  it('deve listar consultas', async () => {
    await request(app)
      .post('/appointments')
      .send({ cpf: '12345678904', datetime: '2025-09-22T12:00:00' });
    const res = await request(app)
      .get('/appointments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
