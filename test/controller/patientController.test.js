const request = require('supertest');
const app = require('../../app');

describe('PatientController', () => {
  it('deve registrar paciente novo', async () => {
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '12345678900', name: 'Paciente Teste' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Patient registered.');
  });

  it('deve impedir registro duplicado', async () => {
    await request(app)
      .post('/patients')
      .send({ cpf: '12345678901', name: 'Paciente Teste' });
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '12345678901', name: 'Paciente Teste' });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Patient already registered.');
  });

  it('deve falhar sem CPF ou nome', async () => {
    const res = await request(app)
      .post('/patients')
      .send({ cpf: '12345678902' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('CPF and name required.');
  });

  it('deve listar pacientes', async () => {
    await request(app)
      .post('/patients')
      .send({ cpf: '12345678903', name: 'Paciente Teste 2' });
    const res = await request(app)
      .get('/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
